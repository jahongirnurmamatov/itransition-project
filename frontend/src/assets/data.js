import {
    Bot,
    UserRoundPen,
    ChartNoAxesCombined,
    Folder
  } from "lucide-react"
  

export const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  
    navMain: [
      {
        title: "My Forms",
        url: "#",
        icon: Folder,
        isActive: true,
        items: [
          {
            title: "All Forms",
            url: "#",
          },
          {
            title: "Favoruites",
            url: "#",
          },
        ],
      },
      {
        title: "Create Forms",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Create New Form",
            url: "#",
          },
          {
            title: "Edit Form",
            url: "#",
          },
        ],
      },
      {
        title: "Responses",
        url: "#",
        icon: ChartNoAxesCombined,
        items: [
          {
            title: "Statistics",
            url: "#",
          },
          {
            title: "All Responses",
            url: "#",
          },
        ],
      },
      {
        title: "Profile",
        url: "#",
        icon: UserRoundPen,
        items: [
          {
            title: "Edit Profile",
            url: "#",
          },
          {
            title: "Allow Users to Edit",
            url: "#",
          },
        ],
      },
    ],
  }