import * as nconf from "nconf";
import * as testFx from "@microsoft/azureportal-test";
import LogLevel = testFx.LogLevel;
import ArmClient = testFx.Utils.Arm.ArmClient;

export class TestSupport {
    private SECRET_PATH: string;

    public armClient: ArmClient;
    public locationId: string;
    public locationName: string;
    public subscriptionId: string;
    public subscriptionName: string;
    public waitTimeout = 60000;

    public get testResourcePrefix(): string {
        return "TestFx-";
    }

    constructor(testContext?: any) {
        // Load command line arguments, environment variables and config.json into nconf
        nconf.argv()
            .env()
            .file(__dirname + "/../config.json");

        //provide windows credential manager as a fallback to the above three
        nconf[testFx.Utils.NConfWindowsCredentialManager.ProviderName] = testFx.Utils.NConfWindowsCredentialManager;
        nconf.use(testFx.Utils.NConfWindowsCredentialManager.ProviderName);

        if (nconf.get("allowUnauthorizedCert") === "true") {
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
        }

        this.subscriptionName = nconf.get("subscriptionName");
        this.subscriptionId = nconf.get("subscriptionId");
        this.locationId = nconf.get("locationId");
        this.locationName = nconf.get("locationDescription");
        this.SECRET_PATH = nconf.get("SECRET_PATH");
    }

    public initializePortalContext() {
        testFx.portal.portalContext.signInEmail = nconf.get("USER_EMAIL_LIVE");
        testFx.portal.portalContext.signInPassword = nconf.get(this.SECRET_PATH);
        testFx.portal.portalContext.features = [
            { name: "feature.rapidToasts", value: "true" },
            { name: "feature.ci", value: "true" },
            { name: "feature.WaitForPendingChanges", value: "false" },
            { name: "feature.resourcemenu", value: "false" },
            { name: "clientOptimizations", value: "bundle" }, //bundle so stack is readable
            { name: "Microsoft_Azure_Marketplace", value: "true" }];
        testFx.portal.portalContext.testExtensions = [
            { name: "NickSampleExtension", uri: "https://localhost:1339/nicksampleextension" },
            
        ];
    }

    public async gatherTestFailureDetails(currentTestTitle: string): Promise<{}> {
        // Try to handle any alerts before getting test details
        const text = await testFx.portal.getAlertText();
        if (text !== "") {
            console.log("Alert found during test clean.  Alert text:" + text);
        }

        await testFx.portal.acceptAlert();
        const logs = await testFx.portal.getBrowserLogs(LogLevel.Info);
        console.log("Console browser logs:");
        logs.forEach((line) => {
            // Filter out the application cache events
            if (line.indexOf("Application Cache") === -1) {
                console.log(line);
            }
        });
        const url = await testFx.portal.getCurrentUrl();
        console.log("Driver url was: " + url);
        return await testFx.portal.takeScreenshot(currentTestTitle);
    }

    public async readError(error: any) {
        return error.stack || error.message || error;
    }
}
