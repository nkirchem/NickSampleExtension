import { makeStyles, tokens } from '@fluentui/react-components';
import { shorthands } from "@fluentui/react-components";

export const useCardStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "720px",
    maxWidth: "100%",
  },
});
  
export const useToolbarStyles = makeStyles({
  icon: {
    fontWeight: "normal",
  },
});

export const useStyles = makeStyles({
    root: { color: tokens.colorNeutralForeground3 },
});

export const useIconStyles = makeStyles({
  root: { fontWeight: "normal" },
});