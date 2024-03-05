import * as React from "react";
import { setTitle } from "@microsoft/azureportal-reactview/Az";
import { FluentProvider, webLightTheme, makeStyles, tokens } from '@fluentui/react-components';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import {
    FontIncrease24Regular,
    FontDecrease24Regular,
    TextFont24Regular,
    MoreHorizontal24Filled,
} from "@fluentui/react-icons";
import {
    Toolbar,
    ToolbarButton,
    ToolbarDivider,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
} from "@fluentui/react-components";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
  } from "@fluentui/react-components";
  import {
    AvatarGroup,
    AvatarGroupItem,
    AvatarGroupPopover,
    partitionAvatarGroupItems,
  } from "@fluentui/react-components";
  import type { AvatarGroupProps } from "@fluentui/react-components";
  import {
    Body1,
    Caption1,
    shorthands,
  } from "@fluentui/react-components";
  import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
  import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
  } from "@fluentui/react-components";

import type { FieldProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  Link,
} from "@fluentui/react-components";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import type { SkeletonProps } from "@fluentui/react-components";

export const SkeletonSample = (props: Partial<SkeletonProps>) => (
  <Skeleton {...props}>
    <SkeletonItem />
  </Skeleton>
);

export const MessageBarSample = () => (
  <MessageBar>
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights.{" "}
      <Link>Link</Link>
    </MessageBarBody>
    <MessageBarActions
      containerAction={
        <Button
          aria-label="dismiss"
          appearance="transparent"
          icon={<DismissRegular />}
        />
      }
    >
      <Button>Action</Button>
      <Button>Action</Button>
    </MessageBarActions>
  </MessageBar>
);
  
export const FieldSample = (props: Partial<FieldProps>) => (
    <Field
      label="Example field"
      validationState="success"
      validationMessage="This is a success message."
      {...props}
    >
      <Input />
    </Field>
);
  
  const resolveAsset = (asset: string) => {
    const ASSET_URL =
      "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/";
  
    return `${ASSET_URL}${asset}`;
  };
  
  const useCardStyles = makeStyles({
    card: {
      ...shorthands.margin("auto"),
      width: "720px",
      maxWidth: "100%",
    },
  });
  
  export const CardSample = () => {
    const styles = useCardStyles();
  
    return (
      <Card className={styles.card}>
        <CardHeader
          image={
            <img
              src={resolveAsset("avatar_elvia.svg")}
              alt="Elvia Atkins avatar picture"
            />
          }
          header={
            <Body1>
              <b>Elvia Atkins</b> mentioned you
            </Body1>
          }
          description={<Caption1>5h ago · About us - Overview</Caption1>}
        />
  
        <CardPreview
          logo={
            <img src={resolveAsset("docx.png")} alt="Microsoft Word document" />
          }
        >
          <img
            src={resolveAsset("doc_template.png")}
            alt="Preview of a Word document: About Us - Overview"
          />
        </CardPreview>
  
        <CardFooter>
          <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
          <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
        </CardFooter>
      </Card>
    );
  };

  const names = [
    "Johnie McConnell",
    "Allan Munger",
    "Erik Nason",
    "Kristin Patterson",
    "Daisy Phillips",
    "Carole Poland",
    "Carlos Slattery",
    "Robert Tolbert",
    "Kevin Sturgis",
    "Charlotte Waltson",
    "Elliot Woodward",
  ];
  
  export const AvatarGroupSample = (props: Partial<AvatarGroupProps>) => {
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({
      items: names,
    });
  
    return (
      <AvatarGroup {...props}>
        {inlineItems.map((name) => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover>
            {overflowItems.map((name) => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    );
  };
  
  export const DialogSample = () => {
    return (
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              exercitationem cumque repellendus eaque est dolor eius expedita
              nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
              in natus iure cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  };

import type { ToolbarProps } from "@fluentui/react-components";
  
export const ToolbarExample = (props: Partial<ToolbarProps>) => (
    <Toolbar aria-label="Default" {...props}>
        <ToolbarButton
        aria-label="Increase Font Size"
        appearance="primary"
        icon={<FontIncrease24Regular />}
        />
        <ToolbarButton
        aria-label="Decrease Font Size"
        icon={<FontDecrease24Regular />}
        />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
        <ToolbarDivider />
        <Menu>
        <MenuTrigger>
            <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
        </MenuTrigger>

        <MenuPopover>
            <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
            </MenuList>
        </MenuPopover>
        </Menu>
    </Toolbar>
);

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return "File";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "author",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return "Author";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return "Last updated";
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate",
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return "Last update";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

const Example = () => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.file.label}
      focusMode="composite"
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

const useStyles = makeStyles({
    root: { color: tokens.colorNeutralForeground3 },
});

setTitle("Fluent 9 smorgasbord");

export const Fluent9Demo = () => {
    const styles = useStyles();
    return <FluentProvider theme={webLightTheme}>
        <div className={styles.root}>
            <MessageBarSample />
            <ToolbarExample />
            <div><AvatarGroupSample /></div>
            <div><DialogSample /></div>
            <div><CardSample /></div>
            <div><FieldSample /></div>
            <div><SkeletonSample /></div>
            <Example />
        </div>
    </FluentProvider>
};

export default Fluent9Demo;
