import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { LuCirclePlus } from "react-icons/lu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaChartPie } from "react-icons/fa";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "my-templates",
    title: "My Templates",
    icon: <DashboardIcon />,
  },
  {
    segment: "create/123",
    title: "Create",
    icon: <LuCirclePlus size={26} />
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "answers",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Responses",
        icon: <DescriptionIcon />,
      },
      {
        segment: "reports",
        title: "Statistics",
        icon: <FaChartPie size={26} />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (pathname) {
      navigate(pathname);
    }
  }, [pathname, navigate]);
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Outlet/>
    </Box>
  );
}
DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Layout(props) {
  const { window } = props;

  const router = useDemoRouter("/my-templates");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
      <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}


Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
