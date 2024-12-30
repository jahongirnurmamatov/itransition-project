import {
    Bot,
    UserRoundPen,
    ChartNoAxesCombined,
    Folder
  } from "lucide-react"
  

export const data = {
  
    navMain: [
      {
        title: "My Forms",
        url: "#",
        icon: Folder,
        isActive: true,
        items: [
          {
            title: "All Forms",
            url: "/my-templates",
          },
          {
            title: "Favoruites",
            url: "/my-favourites",
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
            url: "/template/create",
          },
          {
            title: "Edit Form",
            url: "/template/edit",
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
            url: "/my-profile",
          },
          {
            title: "Allow Users to Edit",
            url: "/users",
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


    
    export const labeledTags = [
      { title: "Technology", id: 1 },
      { title: "Programming", id: 2 },
      { title: "Web Development", id: 3 },
      { title: "Software Engineering", id: 4 },
      { title: "Artificial Intelligence", id: 5 },
      { title: "Machine Learning", id: 6 },
      { title: "Data Science", id: 7 },
      { title: "Cybersecurity", id: 8 },
      { title: "Cloud Computing", id: 9 },
      { title: "DevOps", id: 10 },
      { title: "Blockchain", id: 11 },
      { title: "Cryptocurrency", id: 12 },
      { title: "Internet of Things", id: 13 },
      { title: "Augmented Reality", id: 14 },
      { title: "Virtual Reality", id: 15 },
      { title: "Marketing", id: 16 },
      { title: "Digital Marketing", id: 17 },
      { title: "Social Media Marketing", id: 18 },
      { title: "Content Marketing", id: 19 },
      { title: "Email Marketing", id: 20 },
      { title: "SEO", id: 21 },
      { title: "Business", id: 22 },
      { title: "Finance", id: 23 },
      { title: "Entrepreneurship", id: 24 },
      { title: "Leadership", id: 25 },
      { title: "Productivity", id: 26 },
      { title: "Health", id: 27 },
      { title: "Fitness", id: 28 },
      { title: "Nutrition", id: 29 },
      { title: "Mental Health", id: 30 },
      { title: "Environment", id: 31 },
      { title: "Sustainability", id: 32 },
      { title: "Climate Change", id: 33 },
      { title: "Education", id: 34 },
      { title: "Online Learning", id: 35 },
      { title: "Personal Development", id: 36 },
      { title: "Lifestyle", id: 37 }
    ];

export const activities = [
  {
    time: "2024-12-27 10:00 AM",
    type: "comment",
    title: "Commented on Template",
    description: "John commented on 'Feedback Survey'.",
  },
  {
    time: "2024-12-27 11:00 AM",
    type: "like",
    title: "Liked a Template",
    description: "Jane liked 'Market Research Form'.",
  },
  {
    time: "2024-12-28 09:00 AM",
    type: "template",
    title: "Created a Template",
    description: "Alice created 'Employee Review Form'.",
  },
  {
    time: "2024-12-28 10:30 AM",
    type: "comment",
    title: "Commented on Template",
    description: "Bob commented on 'Customer Feedback'.",
  },
];