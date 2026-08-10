/* =====================================================
EMAILJS CONFIGURATION
===================================================== */

const EMAILJS_PUBLIC_KEY =
    "kBCdtfbYXNi_VmCae";

const EMAILJS_SERVICE_ID =
    "service_nktbq7j";

const EMAILJS_TEMPLATE_ID =
    "template_q5csn5h";



/* =====================================================
INITIALIZE EMAILJS
===================================================== */

if (
    window.emailjs
) {

    emailjs.init({

        publicKey:
            EMAILJS_PUBLIC_KEY

    });

}



/* =====================================================
DARK / LIGHT MODE
===================================================== */

const THEME_KEY =
    "abdallah-portfolio-theme";


const themeToggle =
    document.getElementById(
        "themeToggle"
    );



/* =====================================================
GET CURRENT THEME
===================================================== */

function getCurrentTheme() {

    return (

        document.documentElement
            .getAttribute(
                "data-theme"
            )

        ||

        "dark"

    );

}



/* =====================================================
UPDATE THEME BUTTON
===================================================== */

function updateThemeButton() {

    if (
        !themeToggle
    ) {

        return;

    }


    const currentTheme =
        getCurrentTheme();


    if (
        currentTheme ===
        "dark"
    ) {

        themeToggle
            .setAttribute(
                "aria-label",
                "Switch to light mode"
            );


        themeToggle
            .setAttribute(
                "title",
                "Light mode"
            );

    } else {

        themeToggle
            .setAttribute(
                "aria-label",
                "Switch to dark mode"
            );


        themeToggle
            .setAttribute(
                "title",
                "Dark mode"
            );

    }

}



/* =====================================================
APPLY THEME
===================================================== */

function applyTheme(
    theme,
    saveTheme = true
) {

    const safeTheme =

        theme === "light"

            ? "light"

            : "dark";


    document.documentElement
        .setAttribute(
            "data-theme",
            safeTheme
        );


    if (
        saveTheme
    ) {

        try {

            localStorage
                .setItem(
                    THEME_KEY,
                    safeTheme
                );

        } catch (
            error
        ) {

            console.warn(
                "Could not save theme:",
                error
            );

        }

    }


    updateThemeButton();

}



/* =====================================================
INITIALIZE THEME
===================================================== */

updateThemeButton();



/* =====================================================
THEME TOGGLE
===================================================== */

if (
    themeToggle
) {

    themeToggle
        .addEventListener(
            "click",
            function () {

                const currentTheme =
                    getCurrentTheme();


                const nextTheme =

                    currentTheme ===
                    "dark"

                        ? "light"

                        : "dark";


                applyTheme(
                    nextTheme
                );

            }
        );

}



/* =====================================================
PORTFOLIO LOADER
===================================================== */

const intro =
    document.getElementById(
        "intro"
    );


const loaderStatus =
    document.getElementById(
        "loaderStatus"
    );


const loaderProgressBar =
    document.getElementById(
        "loaderProgressBar"
    );


const loaderPercentage =
    document.getElementById(
        "loaderPercentage"
    );



/* =====================================================
LOADER SETTINGS
===================================================== */

const LOADER_DURATION =
    1100;


let loaderProgress =
    0;


let loaderFinished =
    false;


let loaderStartTime =
    null;


let lastLoaderStatus =

    loaderStatus

        ? loaderStatus
            .textContent
            .trim()

        : "";



/* =====================================================
LOADER TEXT STEPS
===================================================== */

const loaderSteps = [

    {
        progress: 0,
        text:
            "Loading portfolio..."
    },

    {
        progress: 35,
        text:
            "Preparing sections..."
    },

    {
        progress: 70,
        text:
            "Almost ready..."
    },

    {
        progress: 100,
        text:
            "Ready."
    }

];



/* =====================================================
GET LOADER STATUS
===================================================== */

function getLoaderStatus(
    progress
) {

    let currentText =
        loaderSteps[0]
            .text;


    for (
        let i = 0;
        i < loaderSteps.length;
        i++
    ) {

        if (
            progress >=
            loaderSteps[i]
                .progress
        ) {

            currentText =
                loaderSteps[i]
                    .text;

        }

    }


    return currentText;

}



/* =====================================================
UPDATE LOADER STATUS
===================================================== */

function updateLoaderStatus(
    status
) {

    if (

        !loaderStatus

        ||

        status ===
        lastLoaderStatus

    ) {

        return;

    }


    lastLoaderStatus =
        status;


    loaderStatus
        .classList
        .add(
            "changing"
        );


    setTimeout(

        function () {

            loaderStatus
                .textContent =
                status;


            loaderStatus
                .classList
                .remove(
                    "changing"
                );

        },

        130

    );

}



/* =====================================================
UPDATE LOADER
===================================================== */

function updateLoader(
    progress
) {

    loaderProgress =

        Math.min(

            Math.max(
                progress,
                0
            ),

            100

        );


    if (
        loaderProgressBar
    ) {

        loaderProgressBar
            .style
            .width =

            loaderProgress +
            "%";

    }


    if (
        loaderPercentage
    ) {

        loaderPercentage
            .textContent =

            Math.round(
                loaderProgress
            )

            +

            "%";

    }


    updateLoaderStatus(

        getLoaderStatus(
            loaderProgress
        )

    );

}



/* =====================================================
FINISH LOADER
===================================================== */

function finishPortfolioLoader() {

    if (
        loaderFinished
    ) {

        return;

    }


    loaderFinished =
        true;


    updateLoader(
        100
    );


    setTimeout(

        function () {

            document.body
                .classList
                .add(
                    "loader-complete"
                );


            setTimeout(

                function () {

                    document.body
                        .classList
                        .add(
                            "site-open"
                        );


                    if (
                        intro
                    ) {

                        intro.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                    }


                    window.scrollTo({

                        top:
                            0,

                        behavior:
                            "auto"

                    });

                },

                120

            );

        },

        160

    );

}



/* =====================================================
LOADER ANIMATION
===================================================== */

function animatePortfolioLoader(
    timestamp
) {

    if (
        loaderStartTime ===
        null
    ) {

        loaderStartTime =
            timestamp;

    }


    const elapsed =

        timestamp -

        loaderStartTime;


    const normalizedProgress =

        Math.min(

            elapsed /
            LOADER_DURATION,

            1

        );


    const progress =

        normalizedProgress *

        100;


    updateLoader(
        progress
    );


    if (
        normalizedProgress <
        1
    ) {

        requestAnimationFrame(
            animatePortfolioLoader
        );

    } else {

        finishPortfolioLoader();

    }

}



/* =====================================================
START LOADER
===================================================== */

function startPortfolioLoader() {

    const hash =
        window.location.hash;


    if (
        hash.startsWith(
            "#project-"
        )
    ) {

        loaderFinished =
            true;


        updateLoader(
            100
        );


        document.body
            .classList
            .add(
                "loader-complete"
            );


        document.body
            .classList
            .add(
                "site-open"
            );


        if (
            intro
        ) {

            intro.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        return;

    }


    updateLoader(
        0
    );


    requestAnimationFrame(
        animatePortfolioLoader
    );

}



/* =====================================================
START LOADER
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        startPortfolioLoader

    );

} else {

    startPortfolioLoader();

}



/* =====================================================
MOBILE NAV + ACTIVE SECTION
===================================================== */

const navToggle =
    document.getElementById(
        "navToggle"
    );


const navMenu =
    document.getElementById(
        "navMenu"
    );



if (
    navToggle &&
    navMenu
) {

    navToggle
        .addEventListener(

            "click",

            function () {

                const open =

                    document.body
                        .classList
                        .toggle(
                            "nav-open"
                        );


                navToggle
                    .setAttribute(

                        "aria-expanded",

                        open
                            ? "true"
                            : "false"

                    );


                navToggle
                    .setAttribute(

                        "aria-label",

                        open
                            ? "Close menu"
                            : "Open menu"

                    );

            }

        );


    navMenu
        .querySelectorAll(
            "a"
        )
        .forEach(

            function (
                link
            ) {

                link
                    .addEventListener(

                        "click",

                        function () {

                            document.body
                                .classList
                                .remove(
                                    "nav-open"
                                );


                            navToggle
                                .setAttribute(
                                    "aria-expanded",
                                    "false"
                                );


                            navToggle
                                .setAttribute(
                                    "aria-label",
                                    "Open menu"
                                );

                        }

                    );

            }

        );

}



const sectionIds = [

    "home",

    "about",

    "skills",

    "projects",

    "cv",

    "contact"

];



function updateActiveNav() {

    if (
        document.body
            .classList
            .contains(
                "project-open"
            )
    ) {
        return;
    }


    const sections =
        sectionIds
            .map(
                function (id) {
                    return document
                        .getElementById(id);
                }
            )
            .filter(Boolean);


    const navLinks =
        document
            .querySelectorAll(
                "#navMenu a"
            );


    /* =================================================
       IF USER REACHED BOTTOM → CONTACT IS ACTIVE
    ================================================= */

    const reachedBottom =
        window.innerHeight +
        window.scrollY >=
        document.documentElement.scrollHeight - 40;


    if (reachedBottom) {

        navLinks.forEach(
            function (link) {

                const href =
                    link.getAttribute("href");

                const isActive =
                    href === "#contact";


                link.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    link.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );


        return;

    }


    /* =================================================
       NORMAL SECTION DETECTION
    ================================================= */

    const scrollPosition =
        window.scrollY +
        Math.min(
            window.innerHeight * 0.35,
            260
        );


    let currentSection =
        "home";


    sections.forEach(
        function (section) {

            if (
                section.offsetTop <=
                scrollPosition
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    /* =================================================
       UPDATE NAVBAR
    ================================================= */

    navLinks.forEach(
        function (link) {

            const href =
                link.getAttribute("href");


            const isActive =
                href ===
                "#" +
                currentSection;


            link.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNav
);


window.addEventListener(
    "resize",
    updateActiveNav
);

/* =====================================================
CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const sendBtn =
    document.getElementById(
        "sendBtn"
    );


const sendBtnText =
    document.getElementById(
        "sendBtnText"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );



/* =====================================================
FORM STATUS
===================================================== */

function setFormStatus(
    message,
    type = ""
) {

    if (
        !formStatus
    ) {
        return;
    }


    formStatus.textContent =
        message;


    formStatus.className =
        "form-status";


    if (
        message
    ) {

        formStatus.classList.add(
            "visible"
        );

    }


    if (
        type
    ) {

        formStatus.classList.add(
            type
        );

    }

}



/* =====================================================
SEND CONTACT FORM
===================================================== */

if (
    contactForm &&
    sendBtn
) {

    contactForm.addEventListener(
        "submit",
        function (
            event
        ) {

            event.preventDefault();


            /*
             * Remove previous status
             */

            setFormStatus(
                "Sending your message...",
                "sending"
            );


            /*
             * EmailJS unavailable
             */

            if (
                !window.emailjs
            ) {

                setFormStatus(
                    "Email service is temporarily unavailable. Please use the email link instead.",
                    "error"
                );

                return;

            }


            /*
             * Loading state
             */

            sendBtn.disabled =
                true;


            if (
                sendBtnText
            ) {

                sendBtnText.textContent =
                    "Sending...";

            }


            /*
             * Send email
             */

            emailjs
                .sendForm(

                    EMAILJS_SERVICE_ID,

                    EMAILJS_TEMPLATE_ID,

                    contactForm

                )

                .then(

                    function () {

                        /*
                         * Success
                         */

                        contactForm.reset();


                        setFormStatus(
                            "Message sent successfully. I'll get back to you soon.",
                            "success"
                        );


                        sendBtn.disabled =
                            false;


                        if (
                            sendBtnText
                        ) {

                            sendBtnText.textContent =
                                "Send Message";

                        }


                        /*
                         * Hide success message later
                         */

                        setTimeout(

                            function () {

                                setFormStatus(
                                    ""
                                );

                            },

                            6000

                        );

                    }

                )

                .catch(

                    function (
                        error
                    ) {

                        console.error(
                            "EmailJS Error:",
                            error
                        );


                        /*
                         * Error
                         */

                        setFormStatus(
                            "Couldn't send your message. Please try again or contact me by email.",
                            "error"
                        );


                        sendBtn.disabled =
                            false;


                        if (
                            sendBtnText
                        ) {

                            sendBtnText.textContent =
                                "Try Again";

                        }

                    }

                );

        }
    );

}

/* =====================================================
PROJECT DATA
===================================================== */

const projectOrder = [

    "financial",

    "sales",

    "analysis"

];



const projectsData = {


    financial: {


        title:
            "Dynamic Sales Report Dashboard in Excel",


        subtitle:
            "A fully interactive Excel sales dashboard that automatically updates the title, date range, KPIs and summary tables based on the selected reporting period.",


        type:
            "Excel Dashboard",


        tags: [

            "Excel",

            "Data Visualization"

        ],


        description:
            "I built this dynamic Sales Report dashboard in Excel as part of my Data Analysis learning journey. The report title, date range, and all KPIs automatically update based on the Start Date and End Date inputs — making it fully interactive and reusable for any reporting period. The dashboard relies on formulas and structured tables linked to raw transactional data, so changing the date filter instantly refreshes every KPI and table.",


        tools: [

            "Excel",

            "Data Visualization"

        ],


        highlights: [


            {

                title:
                    "Dynamic Title & Date Range",

                text:
                    "The report header updates automatically to reflect the selected Start Date and End Date."

            },


            {

                title:
                    "Leads, Conversions & Sales KPIs",

                text:
                    "Live KPIs including Total Leads, Meetings, Deals, Conversion Rates, Total Sales, and AOV."

            },


            {

                title:
                    "Marketing Channel Performance",

                text:
                    "Compare Landing Page, TikTok, Snapchat, and Cold Outreach by leads, deals, and revenue."

            },


            {

                title:
                    "Salesman Performance",

                text:
                    "Track meetings, deals, conversion rate, total sales, and AOV for each salesman."

            },


            {

                title:
                    "Revenue Summary Tables",

                text:
                    "Quick comparison of Total Sales by Marketing Channel and AOV by Salesman."

            }

        ],


        work: [

            "Built a dynamic Excel dashboard that updates based on Start Date and End Date.",

            "Created a dynamic report title and date range for any reporting period.",

            "Calculated live KPIs for leads, meetings, deals, conversion rates, sales, and AOV.",

            "Analyzed sales performance by marketing channel.",

            "Created individual salesman performance metrics.",

            "Built revenue summary tables for channels and salesmen."

        ],


        insights: [

            "Provides a real-time view of sales performance for any selected period.",

            "Date filters instantly refresh KPIs, tables, and report information.",

            "Marketing channels can be compared by leads, deals, conversion, and revenue.",

            "Salesman performance is easy to evaluate with clear metrics.",

            "Reusable structure linked to transactional data and tables.",

            "Turns raw sales data into a practical reporting experience."

        ],


        images: [

            "./images/Sales Report Dashboard/sales-dashboard-1.jpg",

            "./images/Sales Report Dashboard/sales-dashboard-2.png"

        ]

    },



    sales: {


        title:
            "Dynamic Sales Performance Dashboard",


        subtitle:
            "Track sales performance across branches and salesmen with live KPIs, date filters, and visual branch comparison.",


        type:
            "Sales Analysis",


        tags: [

            "Excel",

            "Sales Analysis",

            "Data Visualization"

        ],


        description:
            "I built this dynamic Sales Report in Excel to track and analyze sales performance across branches and salesmen. The report title and all KPIs update automatically based on the selected Start Date and End Date, making it a flexible tool for any reporting period. The dashboard is fully linked to raw transactional data, so changing the date filter instantly refreshes every KPI, table, and chart.",


        tools: [

            "Excel",

            "Sales Analysis",

            "Data Visualization"

        ],


        highlights: [


            {

                title:
                    "Dynamic Title & Date Range",

                text:
                    "Header automatically reflects the selected reporting period."

            },


            {

                title:
                    "Sales Flow KPIs",

                text:
                    "Live Total Sales, Total Orders, Total Quantity, and Average Order Value."

            },


            {

                title:
                    "Branch Performance",

                text:
                    "Compare Sharkia, Monofya, Giza, Cairo, and more using sales and AOV metrics."

            },


            {

                title:
                    "Salesman Contribution",

                text:
                    "Measure each salesman's impact on total sales and orders."

            },


            {

                title:
                    "Branch Comparison Chart",

                text:
                    "Visual chart highlighting top and bottom performing branches."

            }

        ],


        work: [

            "Built a dynamic Sales Performance Report linked to raw transactional data.",

            "Created Start Date and End Date controls for flexible period analysis.",

            "Created live KPIs for Total Sales, Orders, Quantity, and AOV.",

            "Built branch-level performance analysis across multiple locations.",

            "Created salesman-level performance analysis.",

            "Built a Total Sales by Branch chart for quick comparison."

        ],


        insights: [

            "KPIs, tables, and charts refresh when the reporting period changes.",

            "Branch performance is easy to compare with clear sales metrics.",

            "The branch chart highlights strong and weak locations at a glance.",

            "Salesman analysis shows contribution to overall performance.",

            "No need to rebuild the report for every date range.",

            "Raw data becomes a reusable sales performance report."

        ],


        images: [

            "./images/Sales Performance Dashboard/sales-performance-1.png",

            "./images/Sales Performance Dashboard/sales-performance-2.png",

            "./images/Sales Performance Dashboard/sales-performance-3.png"

        ]

    },



    analysis: {


        title:
            "Financial Performance Dashboard",


        subtitle:
            "Interactive financial dashboard for revenue, expenses, profit trends, and departmental performance.",


        type:
            "Financial Dashboard",


        tags: [

            "Excel Dashboards",

            "KPI Dashboards",

            "Microsoft Excel"

        ],


        description:
            "As part of my Data Analysis learning journey, I built this interactive Financial Performance Dashboard to visualize a company's overall financial and operational performance. It focuses on clear UX and easy navigation across Overview, Revenue, Expenses, and Profit pages using a sidebar menu.",


        tools: [

            "Excel Dashboards",

            "KPI Dashboards",

            "Microsoft Excel"

        ],


        highlights: [


            {

                title:
                    "Top Financial KPIs",

                text:
                    "Revenue, Expenses, Profit, Max Revenue, and Max Expenses at a glance."

            },


            {

                title:
                    "Category Breakdowns",

                text:
                    "Donut charts for Expenses by Category and Revenue by Category."

            },


            {

                title:
                    "Profit by Month",

                text:
                    "Line chart tracking monthly profit trends and fluctuations."

            },


            {

                title:
                    "Department Profitability",

                text:
                    "Compare IT, Marketing, HR, Finance, and Operations."

            },


            {

                title:
                    "Interactive Slicers",

                text:
                    "Filter by Year, Quarter, Month, Department, and Payment Method."

            }

        ],


        work: [

            "Built an interactive Financial Performance Dashboard.",

            "Created top-level KPIs for Revenue, Expenses, Profit, Max Revenue, and Max Expenses.",

            "Created donut charts for expense and revenue categories.",

            "Built a monthly profit trend line chart.",

            "Created department-level profitability analysis.",

            "Added interactive slicers for deeper filtering.",

            "Designed Overview, Revenue, Expenses, and Profit pages with sidebar navigation."

        ],


        insights: [

            "Gives a quick financial overview through core KPIs.",

            "Category analysis clarifies revenue sources and expense distribution.",

            "Monthly profit trends reveal performance patterns.",

            "Department comparison highlights profitability differences.",

            "Slicers support deeper period and segment analysis.",

            "Multi-page structure keeps financial analysis organized.",

            "Clear navigation makes the dashboard easy to explore."

        ],


        images: [

            "./images/Financial Performance Dashboard/financial-performance-1.jpeg"

        ]

    }

};



/* =====================================================
PROJECT ELEMENTS
===================================================== */

const projectDetailsPage =
    document.getElementById(
        "projectDetailsPage"
    );


const projectDetailsTitle =
    document.getElementById(
        "projectDetailsTitle"
    );


const projectDetailsSubtitle =
    document.getElementById(
        "projectDetailsSubtitle"
    );


const projectDetailsTags =
    document.getElementById(
        "projectDetailsTags"
    );


const projectDetailsDescription =
    document.getElementById(
        "projectDetailsDescription"
    );


const projectDetailsTools =
    document.getElementById(
        "projectDetailsTools"
    );


const projectDetailsHighlights =
    document.getElementById(
        "projectDetailsHighlights"
    );


const projectDetailsWork =
    document.getElementById(
        "projectDetailsWork"
    );


const projectDetailsInsights =
    document.getElementById(
        "projectDetailsInsights"
    );


const projectDetailsMeta =
    document.getElementById(
        "projectDetailsMeta"
    );


const projectScreenshotsGrid =
    document.getElementById(
        "projectScreenshotsGrid"
    );


const backToProjects =
    document.getElementById(
        "backToProjects"
    );


const backToProjectsBottom =
    document.getElementById(
        "backToProjectsBottom"
    );


const nextProjectBtn =
    document.getElementById(
        "nextProjectBtn"
    );


let currentProjectId =
    null;



const highlightIconSvg =

    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h2v12h14v2H4Zm4-3V9h2v7H8Zm4 0V6h2v10h-2Zm4 0v-4h2v4h-2Z"/></svg>';



const toolIconSvg =

    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 3h7v4h-7v-4Z"/></svg>';



const expandIconSvg =

    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14h2v4h4v2H4v-6Zm14-4h-2V6h-4V4h6v6ZM6 4v2H4v4H2V4h4Zm16 10v6h-6v-2h4v-4h2Z"/></svg>';



/* =====================================================
IMAGE PATH
===================================================== */

function resolveImagePath(
    imageSource
) {

    return encodeURI(
        imageSource
    );

}



/* =====================================================
RENDER TAG LIST
===================================================== */

function renderTagList(
    container,
    tags
) {

    container.innerHTML =
        "";


    tags.forEach(

        function (
            tagName
        ) {

            const tag =

                document
                    .createElement(
                        "span"
                    );


            tag.className =
                "tag";


            tag.textContent =
                tagName;


            container
                .appendChild(
                    tag
                );

        }

    );

}



/* =====================================================
PROJECT META
===================================================== */

function renderProjectMeta(
    project
) {

    if (
        !projectDetailsMeta
    ) {

        return;

    }


    const imageCount =

        project.images

            ? project.images.length

            : 0;


    const toolCount =

        project.tools

            ? project.tools.length

            : 0;


    projectDetailsMeta.innerHTML = `

        <div class="project-meta-item">

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>
            </svg>

            <span>

                <strong>
                    ${project.type || "Case Study"}
                </strong>

            </span>

        </div>


        <div class="project-meta-item">

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 3h7v4h-7v-4Z"/>
            </svg>

            <span>

                <strong>
                    ${toolCount}
                </strong>

                tools

            </span>

        </div>


        <div class="project-meta-item">

            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v8.2l3.2-3.2 2.3 2.3 3.4-3.4L19 15.5V7H5Z"/>
            </svg>

            <span>

                <strong>
                    ${imageCount}
                </strong>

                screenshots

            </span>

        </div>

    `;

}



/* =====================================================
TOOLS
===================================================== */

function renderTools(
    tools
) {

    projectDetailsTools.innerHTML =
        "";


    tools.forEach(

        function (
            toolName
        ) {

            const tool =

                document
                    .createElement(
                        "span"
                    );


            tool.className =
                "project-tool";


            tool.innerHTML =

                toolIconSvg

                +

                "<span></span>";


            tool
                .querySelector(
                    "span"
                )
                .textContent =
                toolName;


            projectDetailsTools
                .appendChild(
                    tool
                );

        }

    );

}



/* =====================================================
HIGHLIGHTS
===================================================== */

function renderHighlights(
    highlights
) {

    if (
        !projectDetailsHighlights
    ) {

        return;

    }


    projectDetailsHighlights.innerHTML =
        "";


    (
        highlights ||
        []
    )
        .forEach(

            function (
                item
            ) {

                const card =

                    document
                        .createElement(
                            "div"
                        );


                card.className =
                    "project-highlight";


                card.innerHTML = `

                    <div class="project-highlight-icon">
                        ${highlightIconSvg}
                    </div>

                    <h3></h3>

                    <p></p>

                `;


                card
                    .querySelector(
                        "h3"
                    )
                    .textContent =
                    item.title;


                card
                    .querySelector(
                        "p"
                    )
                    .textContent =
                    item.text;


                projectDetailsHighlights
                    .appendChild(
                        card
                    );

            }

        );

}



/* =====================================================
POINT LIST
===================================================== */

function renderPointList(
    container,
    items
) {

    container.innerHTML =
        "";


    items.forEach(

        function (
            itemText,
            index
        ) {

            const item =

                document
                    .createElement(
                        "div"
                    );


            item.className =
                "project-point";


            item.innerHTML = `

                <span class="project-point-index">
                    ${index + 1}
                </span>

            `;


            item.appendChild(

                document.createTextNode(
                    itemText
                )

            );


            container
                .appendChild(
                    item
                );

        }

    );

}



/* =====================================================
NEXT PROJECT
===================================================== */

function updateNextProjectButton(
    projectId
) {

    if (
        !nextProjectBtn
    ) {

        return;

    }


    const currentIndex =

        projectOrder
            .indexOf(
                projectId
            );


    const nextId =

        projectOrder[

            (
                currentIndex +
                1
            )

            %

            projectOrder.length

        ];


    const nextProject =

        projectsData[
            nextId
        ];


    nextProjectBtn
        .dataset
        .nextProject =
        nextId;


    nextProjectBtn.innerHTML = `

        Next:
        ${nextProject.title.split(" ").slice(0, 3).join(" ")}...

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M9.5 6 15.5 12l-6 6-1.4-1.4 4.6-4.6-4.6-4.6L9.5 6Z"/>
        </svg>

    `;

}



/* =====================================================
POPULATE PROJECT
===================================================== */

function populateProject(
    project,
    projectId
) {

    currentProjectId =

        projectId

        ||

        currentProjectId;


    projectDetailsTitle
        .textContent =
        project.title;


    if (

        project.subtitle

        &&

        project.subtitle
            .trim() !==
            ""

    ) {

        projectDetailsSubtitle
            .textContent =
            project.subtitle;


        projectDetailsSubtitle
            .style
            .display =
            "block";

    } else {

        projectDetailsSubtitle
            .textContent =
            "";


        projectDetailsSubtitle
            .style
            .display =
            "none";

    }


    projectDetailsDescription
        .textContent =
        project.description;


    renderTagList(

        projectDetailsTags,

        project.tags

    );


    renderProjectMeta(
        project
    );


    renderTools(
        project.tools
    );


    renderHighlights(
        project.highlights
    );


    renderPointList(

        projectDetailsWork,

        project.work

    );


    renderPointList(

        projectDetailsInsights,

        project.insights

    );


    if (
        currentProjectId
    ) {

        updateNextProjectButton(
            currentProjectId
        );

    }


    renderProjectScreenshots(

        project.images,

        project.title

    );

}



/* =====================================================
OPEN PROJECT
===================================================== */

function openProject(
    projectId
) {

    const project =

        projectsData[
            projectId
        ];


    if (
        !project
    ) {

        console.error(
            "Project not found:",
            projectId
        );

        return;

    }


    populateProject(
        project,
        projectId
    );


    document.body
        .classList
        .add(
            "project-open"
        );


    projectDetailsPage
        .setAttribute(
            "aria-hidden",
            "false"
        );


    window.scrollTo({

        top:
            0,

        behavior:
            "auto"

    });


    history.pushState(

        {
            project:
                projectId
        },

        "",

        "#project-" +
        projectId

    );

}



/* =====================================================
PROJECT SCREENSHOTS
===================================================== */

function renderProjectScreenshots(
    images,
    projectTitle
) {

    projectScreenshotsGrid.innerHTML =
        "";


    images.forEach(

        function (
            imageSource,
            index
        ) {

            const screenshot =

                document
                    .createElement(
                        "div"
                    );


            screenshot.className =
                "project-screenshot";


            screenshot.innerHTML = `

                <span class="project-screenshot-badge">
                    0${index + 1}
                </span>

                <div class="project-screenshot-overlay">

                    ${expandIconSvg}

                    <span>
                        Click to expand
                    </span>

                </div>

            `;


            const image =

                document
                    .createElement(
                        "img"
                    );


            image.alt =

                projectTitle

                +

                " Screenshot "

                +

                (
                    index +
                    1
                );


            image.loading =
                "lazy";


            image.decoding =
                "async";


            const resolvedImageSource =

                resolveImagePath(
                    imageSource
                );


            image.onload =

                function () {

                    screenshot
                        .classList
                        .add(
                            "loaded"
                        );


                    screenshot.onclick =

                        function () {

                            openProjectLightbox(
                                imageSource
                            );

                        };

                };


            image.onerror =

                function () {

                    console.error(

                        "Image could not be loaded:",

                        imageSource

                    );


                    screenshot.innerHTML = `

                        <div class="project-screenshot-placeholder">

                            <strong>
                                Screenshot ${index + 1}
                            </strong>

                            <small>
                                Image not found
                            </small>

                        </div>

                    `;

                };


            image.src =
                resolvedImageSource;


            screenshot.insertBefore(

                image,

                screenshot
                    .querySelector(
                        ".project-screenshot-overlay"
                    )

            );


            projectScreenshotsGrid
                .appendChild(
                    screenshot
                );

        }

    );

}



/* =====================================================
PROJECT BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".project-link[data-project]"
    )
    .forEach(

        function (
            button
        ) {

            button
                .addEventListener(

                    "click",

                    function () {

                        const projectId =

                            button
                                .dataset
                                .project;


                        openProject(
                            projectId
                        );

                    }

                );

        }

    );



/* =====================================================
CLOSE PROJECT
===================================================== */

function closeProjectPage(
    updateHistory = true
) {

    document.body
        .classList
        .remove(
            "project-open"
        );


    projectDetailsPage
        .setAttribute(
            "aria-hidden",
            "true"
        );


    if (
        updateHistory
    ) {

        history.pushState(

            {},

            "",

            "#projects"

        );

    }


    setTimeout(

        function () {

            const projectsSection =

                document
                    .getElementById(
                        "projects"
                    );


            if (
                projectsSection
            ) {

                projectsSection
                    .scrollIntoView({

                        behavior:
                            "smooth"

                    });

            }

        },

        50

    );

}



if (
    backToProjects
) {

    backToProjects
        .addEventListener(

            "click",

            function () {

                closeProjectPage();

            }

        );

}



if (
    backToProjectsBottom
) {

    backToProjectsBottom
        .addEventListener(

            "click",

            function () {

                closeProjectPage();

            }

        );

}



if (
    nextProjectBtn
) {

    nextProjectBtn
        .addEventListener(

            "click",

            function () {

                const nextId =

                    nextProjectBtn
                        .dataset
                        .nextProject;


                if (

                    nextId

                    &&

                    projectsData[
                        nextId
                    ]

                ) {

                    openProject(
                        nextId
                    );

                }

            }

        );

}



/* =====================================================
LIGHTBOX ELEMENTS
===================================================== */

const projectLightbox =
    document.getElementById(
        "projectLightbox"
    );


const projectLightboxImage =
    document.getElementById(
        "projectLightboxImage"
    );


const projectLightboxStage =
    document.getElementById(
        "projectLightboxStage"
    );


const closeProjectLightbox =
    document.getElementById(
        "closeProjectLightbox"
    );


const zoomInBtn =
    document.getElementById(
        "zoomInBtn"
    );


const zoomOutBtn =
    document.getElementById(
        "zoomOutBtn"
    );


const zoomResetBtn =
    document.getElementById(
        "zoomResetBtn"
    );


const zoomPercentage =
    document.getElementById(
        "zoomPercentage"
    );



/* =====================================================
ZOOM STATE
===================================================== */

let currentZoom =
    1;


const MIN_ZOOM =
    0.5;


const MAX_ZOOM =
    4;


const ZOOM_STEP =
    0.25;



/* =====================================================
PAN STATE
===================================================== */

let imageTranslateX =
    0;


let imageTranslateY =
    0;


let isImageDragging =
    false;


let dragStartX =
    0;


let dragStartY =
    0;


let dragOriginX =
    0;


let dragOriginY =
    0;



/* =====================================================
OPEN LIGHTBOX
===================================================== */

function openProjectLightbox(
    imageSource
) {

    projectLightboxImage
        .src =

        resolveImagePath(
            imageSource
        );


    projectLightbox
        .classList
        .add(
            "open"
        );


    projectLightbox
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .style
        .overflow =
        "hidden";


    resetImageZoom();


    if (
        closeProjectLightbox
    ) {

        closeProjectLightbox
            .focus();

    }

}



/* =====================================================
CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    projectLightbox
        .classList
        .remove(
            "open"
        );


    projectLightbox
        .setAttribute(
            "aria-hidden",
            "true"
        );


    projectLightboxImage
        .src =
        "";


    document.body
        .style
        .overflow =
        "";


    resetImageZoom();

}



/* =====================================================
IMAGE TRANSFORM
===================================================== */

function updateImageTransform() {

    projectLightboxImage
        .style
        .transform =

        `translate(${imageTranslateX}px, ${imageTranslateY}px) scale(${currentZoom})`;


    if (
        zoomPercentage
    ) {

        zoomPercentage
            .textContent =

            Math.round(
                currentZoom *
                100
            )

            +

            "%";

    }


    if (
        currentZoom >
        1
    ) {

        projectLightboxStage
            .classList
            .add(
                "zoomed"
            );

    } else {

        projectLightboxStage
            .classList
            .remove(
                "zoomed"
            );

    }

}



/* =====================================================
ZOOM
===================================================== */

function zoomIn() {

    currentZoom =

        Math.min(

            MAX_ZOOM,

            currentZoom +
            ZOOM_STEP

        );


    updateImageTransform();

}



function zoomOut() {

    currentZoom =

        Math.max(

            MIN_ZOOM,

            currentZoom -
            ZOOM_STEP

        );


    if (
        currentZoom <=
        1
    ) {

        imageTranslateX =
            0;


        imageTranslateY =
            0;

    }


    updateImageTransform();

}



function resetImageZoom() {

    currentZoom =
        1;


    imageTranslateX =
        0;


    imageTranslateY =
        0;


    isImageDragging =
        false;


    projectLightboxStage
        .classList
        .remove(

            "zoomed",

            "dragging"

        );


    updateImageTransform();

}



/* =====================================================
ZOOM BUTTONS
===================================================== */

if (
    zoomInBtn
) {

    zoomInBtn
        .addEventListener(

            "click",

            function (
                event
            ) {

                event
                    .stopPropagation();


                zoomIn();

            }

        );

}



if (
    zoomOutBtn
) {

    zoomOutBtn
        .addEventListener(

            "click",

            function (
                event
            ) {

                event
                    .stopPropagation();


                zoomOut();

            }

        );

}



if (
    zoomResetBtn
) {

    zoomResetBtn
        .addEventListener(

            "click",

            function (
                event
            ) {

                event
                    .stopPropagation();


                resetImageZoom();

            }

        );

}



/* =====================================================
MOUSE WHEEL
===================================================== */

if (
    projectLightboxStage
) {

    projectLightboxStage
        .addEventListener(

            "wheel",

            function (
                event
            ) {

                if (

                    !projectLightbox
                        .classList
                        .contains(
                            "open"
                        )

                ) {

                    return;

                }


                event
                    .preventDefault();


                if (
                    event.deltaY <
                    0
                ) {

                    zoomIn();

                } else {

                    zoomOut();

                }

            },

            {

                passive:
                    false

            }

        );

}



/* =====================================================
DOUBLE CLICK
===================================================== */

if (
    projectLightboxImage
) {

    projectLightboxImage
        .addEventListener(

            "dblclick",

            function (
                event
            ) {

                event
                    .stopPropagation();


                if (
                    currentZoom ===
                    1
                ) {

                    currentZoom =
                        2;


                    updateImageTransform();

                } else {

                    resetImageZoom();

                }

            }

        );

}



/* =====================================================
START DRAG
===================================================== */

if (
    projectLightboxImage
) {

    projectLightboxImage
        .addEventListener(

            "mousedown",

            function (
                event
            ) {

                if (
                    currentZoom <=
                    1
                ) {

                    return;

                }


                event
                    .preventDefault();


                event
                    .stopPropagation();


                isImageDragging =
                    true;


                dragStartX =
                    event.clientX;


                dragStartY =
                    event.clientY;


                dragOriginX =
                    imageTranslateX;


                dragOriginY =
                    imageTranslateY;


                projectLightboxStage
                    .classList
                    .add(
                        "dragging"
                    );

            }

        );

}



/* =====================================================
DRAG IMAGE
===================================================== */

document
    .addEventListener(

        "mousemove",

        function (
            event
        ) {

            if (
                !isImageDragging
            ) {

                return;

            }


            const deltaX =

                event.clientX -

                dragStartX;


            const deltaY =

                event.clientY -

                dragStartY;


            imageTranslateX =

                dragOriginX +

                deltaX;


            imageTranslateY =

                dragOriginY +

                deltaY;


            updateImageTransform();

        }

    );



/* =====================================================
STOP DRAG
===================================================== */

document
    .addEventListener(

        "mouseup",

        function () {

            if (
                !isImageDragging
            ) {

                return;

            }


            isImageDragging =
                false;


            projectLightboxStage
                .classList
                .remove(
                    "dragging"
                );

        }

    );



/* =====================================================
CLOSE LIGHTBOX BUTTON
===================================================== */

if (
    closeProjectLightbox
) {

    closeProjectLightbox
        .addEventListener(

            "click",

            function (
                event
            ) {

                event
                    .stopPropagation();


                closeLightbox();

            }

        );

}



/* =====================================================
CLICK OUTSIDE IMAGE
===================================================== */

if (
    projectLightbox
) {

    projectLightbox
        .addEventListener(

            "click",

            function (
                event
            ) {

                if (

                    event.target ===
                    projectLightbox

                    ||

                    event.target ===
                    projectLightboxStage

                ) {

                    closeLightbox();

                }

            }

        );

}



/* =====================================================
ESC KEY
===================================================== */

document
    .addEventListener(

        "keydown",

        function (
            event
        ) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            if (

                projectLightbox

                &&

                projectLightbox
                    .classList
                    .contains(
                        "open"
                    )

            ) {

                closeLightbox();

                return;

            }


            if (

                document.body
                    .classList
                    .contains(
                        "project-open"
                    )

            ) {

                closeProjectPage();

                return;

            }


            if (

                document.body
                    .classList
                    .contains(
                        "nav-open"
                    )

            ) {

                document.body
                    .classList
                    .remove(
                        "nav-open"
                    );


                if (
                    navToggle
                ) {

                    navToggle
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );

                }

            }

        }

    );



/* =====================================================
BROWSER BACK
===================================================== */

window
    .addEventListener(

        "popstate",

        function () {

            const hash =
                window.location.hash;


            if (
                hash.startsWith(
                    "#project-"
                )
            ) {

                const projectId =

                    hash.replace(

                        "#project-",

                        ""

                    );


                if (

                    projectsData[
                        projectId
                    ]

                ) {

                    openProjectFromHistory(
                        projectId
                    );

                }


                return;

            }


            if (

                document.body
                    .classList
                    .contains(
                        "project-open"
                    )

            ) {

                closeProjectPage(
                    false
                );

            }

        }

    );



/* =====================================================
OPEN PROJECT FROM HISTORY
===================================================== */

function openProjectFromHistory(
    projectId
) {

    const project =

        projectsData[
            projectId
        ];


    if (
        !project
    ) {

        return;

    }


    populateProject(

        project,

        projectId

    );


    document.body
        .classList
        .add(
            "site-open"
        );


    document.body
        .classList
        .add(
            "project-open"
        );


    projectDetailsPage
        .setAttribute(
            "aria-hidden",
            "false"
        );


    window.scrollTo({

        top:
            0,

        behavior:
            "auto"

    });

}



/* =====================================================
DIRECT PROJECT URL
===================================================== */

(function checkProjectURL() {

    const hash =
        window.location.hash;


    if (
        !hash.startsWith(
            "#project-"
        )
    ) {

        return;

    }


    const projectId =

        hash.replace(

            "#project-",

            ""

        );


    if (

        projectsData[
            projectId
        ]

    ) {

        document.body
            .classList
            .add(
                "site-open"
            );


        document.body
            .classList
            .add(
                "loader-complete"
            );


        if (
            intro
        ) {

            intro.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        openProjectFromHistory(
            projectId
        );

    }

})();