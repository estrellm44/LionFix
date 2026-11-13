// FIXME: Store requests until backe end connected
const requests = [
    {
        //Sample request
        id: 1,
        description: "Broken light in entrance",
        category: "Electrical",
        campus: "Main campus",
        building: "Library",
        specific_location: "Front Entrance",
        status: "Submitted",
        createdTime: "2026-11-01"
    },

    {
        id: 2,
        description: "Broken light in entrance",
        category: "Electrical",
        campus: "Main campus",
        building: "Library",
        specific_location: "Front Entrance",
        status: "Assigned",
        createdTime: "2026-11-02"
    },

    {
        id: 3,
        description: "Broken light in entrance",
        category: "Electrical",
        campus: "Main campus",
        building: "Library",
        specific_location: "Front Entrance",
        status: "Pending",
        createdTime: "2026-10-01"
    },

    {
        id: 4,
        description: "Broken light in entrance",
        category: "Electrical",
        campus: "Main campus",
        building: "Library",
        specific_location: "Front Entrance",
        status: "In Progress", 
        createdTime: "2026-01-01",
        additionalComments: "The light above the library’s front entrance is out.",

        messages: [
            {
                type: "inquiry",
                author: "Facilities staff",
                text: "Which entrance has the broken light?",
                postedAt: "2026-11-12T14:30:00",
                needsReply: true,
                replies: []
            },

            {
                type: "update",
                author: "Facilities staff",
                text: "A technician has been assigned and will check the light tomorrow morning.",
                postedAt: "2026-12-12T14:30:00"
            },

            {
                type: "update",
                author: "Facilities staff",
                text: "Fixed entrance light.",
                postedAt: "2026-13-12T14:30:00"
            }
        ],
    },

    {
        id: 5,
        description: "Broken light in entrance",
        category: "Electrical",
        campus: "Main campus",
        building: "Library",
        specific_location: "Front Entrance",
        status: "Closed",
        createdTime: "2026-09-10",
        observedTime: "Nov 1, 2026, 3:15 PM",
        additionalComments: "The light above the library’s front entrance is out."
    },
 
];