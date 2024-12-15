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

  export const tableData = 
    [
      {
        "id": 1,
        "title": "Survey Form",
        "status": "Active",
        "date": "2023-01-01",
        "description": "Description of the form goes here."
      },
      {
        "id": 2,
        "title": "Customer Feedback Survey",
        "status": "Active",
        "date": "2023-02-15",
        "description": "Gather feedback on customer satisfaction."
      },
      {
        "id": 3,
        "title": "Employee Satisfaction Survey",
        "status": "Inactive",
        "date": "2023-03-10",
        "description": "Assess employee morale and well-being."
      },
      {
        "id": 4,
        "title": "Product Feedback Survey",
        "status": "Active",
        "date": "2023-04-20",
        "description": "Collect feedback on new product features."
      },
      {
        "id": 5,
        "title": "Market Research Survey",
        "status": "Active",
        "date": "2023-05-05",
        "description": "Gather insights into market trends."
      },
      {
        "id": 6,
        "title": "Website Usability Survey",
        "status": "Inactive",
        "date": "2023-06-12",
        "description": "Evaluate website user experience."
      },
      {
        "id": 7,
        "title": "Event Feedback Survey",
        "status": "Active",
        "date": "2023-07-25",
        "description": "Collect feedback on a recent event."
      },
      {
        "id": 8,
        "title": "Training Evaluation Survey",
        "status": "Active",
        "date": "2023-08-10",
        "description": "Assess the effectiveness of training programs."
      },
      {
        "id": 9,
        "title": "Customer Satisfaction Survey (Q3)",
        "status": "Active",
        "date": "2023-09-20",
        "description": "Quarterly customer satisfaction survey."
      },
      {
        "id": 10,
        "title": "Community Survey",
        "status": "Inactive",
        "date": "2023-10-05",
        "description": "Gather feedback from the local community."
      }
    ]