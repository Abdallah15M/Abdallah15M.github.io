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


    /*
        When moving between index.html and projects.html,
        skip the loader completely.

        The flag is created just before the user leaves
        the current page and removed immediately after
        the destination page reads it.
    */

    let skipLoader =
        false;


    try {

        skipLoader =
            sessionStorage.getItem(
                "abdallah-skip-next-loader"
            ) === "true";


        if (
            skipLoader
        ) {

            sessionStorage.removeItem(
                "abdallah-skip-next-loader"
            );

        }

    } catch (
    error
    ) {

        console.warn(
            "Could not read navigation loader state:",
            error
        );

    }


    if (
        skipLoader
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


        /*
            If the destination contains a section hash
            such as #home, #about, #skills, #projects,
            #cv or #contact, go to it immediately.
        */

        requestAnimationFrame(

            function () {

                if (
                    hash

                    &&

                    !hash.startsWith(
                        "#project-"
                    )
                ) {

                    const targetId =
                        hash.slice(
                            1
                        );


                    const target =
                        document.getElementById(
                            targetId
                        );


                    if (
                        target
                    ) {

                        target.scrollIntoView({

                            behavior:
                                "auto",

                            block:
                                "start"

                        });


                        updateActiveNav();


                        return;

                    }

                }


                if (
                    !hash
                ) {

                    window.scrollTo({

                        top:
                            0,

                        behavior:
                            "auto"

                    });

                }

            }

        );


        return;

    }


    /*
        Direct project URLs already skip the loader.
    */

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


    /*
        Normal first visit:
        keep the original portfolio loader.
    */

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
SKIP LOADER BETWEEN PORTFOLIO PAGES
===================================================== */

/*
    The normal loader is still shown when the website
    is opened normally for the first time.

    It is skipped only when navigating between:
        index.html
        projects.html

    This includes:
        View All Projects
        Back to Portfolio
        Home
        About
        Skills
        CV
        Contact
*/

document.addEventListener(

    "click",

    function (
        event
    ) {

        const link =
            event.target.closest(
                "a[href]"
            );


        if (
            !link
        ) {

            return;

        }


        /*
            Do not interfere with:
            Ctrl/Cmd click, Shift click,
            Alt click or non-left-click navigation.
        */

        if (
            event.defaultPrevented

            ||

            event.button !== 0

            ||

            event.ctrlKey

            ||

            event.metaKey

            ||

            event.shiftKey

            ||

            event.altKey
        ) {

            return;

        }


        const rawHref =
            link.getAttribute(
                "href"
            );


        if (
            !rawHref
        ) {

            return;

        }


        let destination;


        try {

            destination =
                new URL(
                    rawHref,
                    window.location.href
                );

        } catch (
        error
        ) {

            return;

        }


        /*
            Only handle links inside this same website.
        */

        if (
            destination.origin !==
            window.location.origin
        ) {

            return;

        }


        const currentFile =
            window.location.pathname
                .split("/")
                .pop()

            ||

            "index.html";


        const destinationFile =
            destination.pathname
                .split("/")
                .pop()

            ||

            "index.html";


        const portfolioFiles = [

            "index.html",

            "projects.html"

        ];


        const isCurrentPortfolioPage =
            portfolioFiles.includes(
                currentFile
            );


        const isDestinationPortfolioPage =
            portfolioFiles.includes(
                destinationFile
            );


        const isCrossPageNavigation =
            isCurrentPortfolioPage

            &&

            isDestinationPortfolioPage

            &&

            currentFile !==
            destinationFile;


        if (
            !isCrossPageNavigation
        ) {

            return;

        }


        try {

            sessionStorage.setItem(

                "abdallah-skip-next-loader",

                "true"

            );

        } catch (
        error
        ) {

            console.warn(
                "Could not save navigation loader state:",
                error
            );

        }

    }

);



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

    "mavenMarket",

    "adventureWorks",

    "financial",

    "sales",

    "analysis"

];



const projectsData = {


    /* =====================================================
       MAVEN MARKET
    ===================================================== */

    mavenMarket: {


        title:
            "Maven Market Dashboard",


        subtitle:
            "Interactive Power BI dashboard for monitoring monthly transactions, profit, returns, revenue trends, product-brand performance and geographic store activity.",


        cardDescription:
            "Interactive Power BI retail dashboard tracking transactions, profit, returns, revenue targets, brand performance and geographic trends.",


        type:
            "Power BI Dashboard",


        tags: [

            "Power BI",

            "DAX",

            "Data Analysis"

        ],


        description:
            "I built this Maven Market Dashboard in Power BI to turn retail transaction data into a clear, interactive business reporting experience. The dashboard brings together current-month transactions, profit and returns, compares performance with goals, tracks weekly revenue, evaluates revenue against target, analyzes product-brand profitability and return rates, and explores store activity geographically. Country filtering and map-based analysis make it easy to move from a high-level performance view into specific markets and store locations.",


        tools: [

            "Power BI",

            "DAX",

            "Data Modeling",

            "Azure Maps",

            "Data Visualization"

        ],


        highlights: [


            {

                title:
                    "Current-Month KPI Tracking",

                text:
                    "Current Month Transactions, Profit and Returns are displayed as KPI cards with goal comparisons for quick performance monitoring."

            },


            {

                title:
                    "Product Brand Performance",

                text:
                    "A detailed brand-level table compares Total Transactions, Total Profit, Profit Margin and Return Rate using visual formatting for faster analysis."

            },


            {

                title:
                    "Geographic Store Analysis",

                text:
                    "Azure Maps and a geographic treemap visualize transaction activity across store locations, while country filtering supports focused market analysis."

            },


            {

                title:
                    "Weekly Revenue Trending",

                text:
                    "A weekly revenue chart makes changes, spikes and performance patterns across the year easy to identify."

            },


            {

                title:
                    "Revenue vs. Target",

                text:
                    "A gauge compares actual revenue with the business target so the remaining performance gap can be understood immediately."

            }

        ],


        work: [

            "Built an interactive one-page Power BI dashboard for Maven Market retail performance.",

            "Created and used measures for transactions, profit, returns, revenue, goal comparisons, profit margin, return rate and revenue targets.",

            "Designed KPI cards for Current Month Transactions, Current Month Profit and Current Month Returns.",

            "Built a product-brand performance table covering transactions, profit, margin and return rate.",

            "Added conditional formatting and data bars to make brand-level comparisons easier to scan.",

            "Created an Azure Map to analyze transaction activity by store city and geographic location.",

            "Added country-level filtering for USA, Canada and Mexico.",

            "Built a weekly revenue trend chart to monitor performance throughout the year.",

            "Created a Revenue vs. Target gauge for at-a-glance target tracking.",

            "Combined KPI, product, geographic and time-based analysis into a single business-focused dashboard."

        ],


        insights: [

            "The dashboard combines operational volume, profitability and returns so performance can be evaluated from more than one business perspective.",

            "Goal comparisons make it easy to see whether current-month performance is moving above or below expected levels.",

            "Brand-level analysis helps identify differences in transaction volume, profit margin and return behavior across products.",

            "Geographic visuals reveal where transaction activity is concentrated and allow country-specific analysis.",

            "Weekly revenue trending helps surface spikes, dips and possible seasonal patterns.",

            "The revenue gauge makes progress toward the business target immediately visible.",

            "Interactive filtering turns the report from a static summary into a reusable decision-support dashboard."

        ],


        images: [

            "./images/Maven Market/maven-market-1.png"

        ]

    },



    financial: {


        title:
            "Dynamic Sales Report Dashboard in Excel",


        subtitle:
            "A fully interactive Excel sales dashboard that automatically updates the title, date range, KPIs and summary tables based on the selected reporting period.",


        cardDescription:
            "Interactive Excel sales dashboard with dynamic date filtering, live KPIs, marketing channel analysis and salesman performance reporting.",


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


        cardDescription:
            "Interactive sales performance dashboard designed to track KPIs, analyze sales trends and compare business performance dynamically.",


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


        cardDescription:
            "Interactive financial dashboard designed to visualize KPIs, revenue, expenses, profit trends and departmental performance.",


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

    },


    /* =====================================================
       ADVENTURE WORKS
    ===================================================== */

    adventureWorks: {


        title:
            "Adventure Works Dashboard",


        subtitle:
            "Interactive Power BI dashboard designed to explore sales performance, trends, products, customers and geographic insights.",


        cardDescription:
            "Interactive Adventure Works dashboard for analyzing sales KPIs, trends, product performance, customers and geographic results.",


        type:
            "Power BI Dashboard",


        tags: [

            "Power BI",

            "Data Analysis",

            "Data Visualization"

        ],


        description:
            "I built this Adventure Works dashboard as part of my Data Analysis learning journey to transform business data into a clear and interactive reporting experience. The project combines multiple report views to analyze overall performance, sales trends, products, customers and geographic results while making it easy to explore the data from different perspectives.",


        tools: [

            "Power BI",

            "Data Analysis",

            "Data Visualization"

        ],


        highlights: [


            {

                title:
                    "Executive Overview",

                text:
                    "A high-level dashboard view with important KPIs and business performance indicators."

            },


            {

                title:
                    "Sales Performance",

                text:
                    "Analyze sales performance and monitor changes across different reporting views."

            },


            {

                title:
                    "Trend Analysis",

                text:
                    "Visualize performance trends over time using interactive charts and KPI indicators."

            },


            {

                title:
                    "Geographic Analysis",

                text:
                    "Explore business performance across different geographic locations using map-based visualization."

            },


            {

                title:
                    "Detailed Analysis",

                text:
                    "Additional report pages provide deeper analysis of products, customers and business performance."

            }

        ],


        work: [

            "Built a multi-page Adventure Works business intelligence dashboard.",

            "Designed an executive overview for quick KPI monitoring.",

            "Created interactive visuals for sales and performance analysis.",

            "Added trend analysis to make changes in performance easier to understand.",

            "Created geographic reporting using map visualization.",

            "Built additional analytical report pages for deeper exploration.",

            "Designed a consistent dashboard layout across multiple pages."

        ],


        insights: [

            "Provides a quick overview of overall business performance.",

            "Multiple report pages make detailed analysis easier to navigate.",

            "Trend visuals help identify changes in performance over time.",

            "Geographic visualization helps compare performance across locations.",

            "Interactive reporting allows users to explore the data from multiple perspectives.",

            "Transforms Adventure Works data into a structured visual reporting experience."

        ],


        images: [

            "./images/Adventure Works/adventure works-1.png",

            "./images/Adventure Works/adventure works-2.png",

            "./images/Adventure Works/adventure works-3.png",

            "./images/Adventure Works/adventure works-4.png",

            "./images/Adventure Works/adventure works-5.png",

            "./images/Adventure Works/adventure works-6.png",

            "./images/Adventure Works/adventure works-7.png"

        ]

    }

};



/* =====================================================
PROJECT CARD ICONS
===================================================== */

/*
    These icons are used by projects.html.

    The home page keeps its existing three static cards,
    while the dedicated projects page is generated from
    projectsData automatically.
*/

const projectCardIcons = {

    mavenMarket:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h2v12h14v2H4Zm3-3v-4h3v4H7Zm5 0V8h3v8h-3Zm5 0v-6h3v6h-3Z"/></svg>',


    financial:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 4v2h4V7H6Zm6 0v2h6V7h-6ZM6 11v2h3v-2H6Zm5 0v2h7v-2h-7ZM6 15v2h5v-2H6Zm7 0v2h5v-2h-5Z"/></svg>',

    sales:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h2v12h14v2H4Zm3.5-3 3.2-4.2 2.6 2.1L17 8.5l1.5 1.2-5.4 6.8-2.7-2.2L7.5 16Z"/></svg>',

    analysis:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v4H5V4Zm0 6h6v10H5V10Zm8 0h6v4h-6v-4Zm0 6h6v4h-6v-4Z"/></svg>',

    adventureWorks:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h2v12h14v2H4Zm3-3v-5h3v5H7Zm5 0V8h3v8h-3Zm5 0v-3h3v3h-3Z"/></svg>'

};



const defaultProjectCardIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>';



/* =====================================================
CREATE PROJECT CARD
===================================================== */

function createProjectCard(
    projectId,
    project
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "project";


    card.dataset.projectCard =
        projectId;


    const tagsHtml =
        (
            project.tags ||
            []
        )
            .map(
                function (
                    tag
                ) {

                    return (
                        '<span class="tag">' +
                        escapeHtml(
                            tag
                        ) +
                        '</span>'
                    );

                }
            )
            .join(
                ""
            );


    const icon =
        projectCardIcons[
        projectId
        ]

        ||

        defaultProjectCardIcon;


    const description =
        project.cardDescription

        ||

        project.subtitle

        ||

        project.description

        ||

        "";


    card.innerHTML = `

        <div class="project-image">
            ${icon}
        </div>

        <div class="project-content">

            <h3>
                ${escapeHtml(project.title)}
            </h3>

            <p>
                ${escapeHtml(description)}
            </p>

            <div class="tags">
                ${tagsHtml}
            </div>

            <button
                type="button"
                class="project-link"
                data-project="${escapeHtml(projectId)}"
            >

                View Project

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M5 11h11.2l-3.6-3.6L14 6l6 6-6 6-1.4-1.4 3.6-3.6H5v-2Z"/>
                </svg>

            </button>

        </div>

    `;


    return card;

}



/* =====================================================
SAFE HTML TEXT
===================================================== */

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =====================================================
RENDER ALL PROJECTS PAGE
===================================================== */

/*
    projects.html only needs an element with:

        id="allProjectsGrid"
        class="projects"

    Every project in projectOrder will then appear
    automatically on that page.
*/

function renderAllProjectsPage() {

    const allProjectsGrid =
        document.getElementById(
            "allProjectsGrid"
        );


    if (
        !allProjectsGrid
    ) {

        return;

    }


    allProjectsGrid.innerHTML =
        "";


    projectOrder.forEach(

        function (
            projectId
        ) {

            const project =
                projectsData[
                projectId
                ];


            if (
                !project
            ) {

                console.warn(
                    "Project listed in projectOrder was not found:",
                    projectId
                );

                return;

            }


            allProjectsGrid.appendChild(

                createProjectCard(
                    projectId,
                    project
                )

            );

        }

    );


    const projectsCount =
        document.getElementById(
            "projectsCount"
        );


    if (
        projectsCount
    ) {

        projectsCount.textContent =
            projectOrder.length;

    }

}



/* =====================================================
RENDER FEATURED PROJECTS ON HOME
===================================================== */

/*
    Home always shows the first 3 projects from projectOrder.

    To add a new project later:
    1) Add its data to projectsData.
    2) Put its ID at the TOP of projectOrder.

    It will automatically:
    - appear first on Home
    - push the oldest featured project out of Home
    - remain visible with every project on projects.html
*/

function renderFeaturedProjects() {

    /*
        projects.html has #allProjectsGrid.
        If it exists, this is not the Home featured grid.
    */

    if (
        document.getElementById(
            "allProjectsGrid"
        )
    ) {

        return;

    }


    const projectsSection =
        document.getElementById(
            "projects"
        );


    if (
        !projectsSection
    ) {

        return;

    }


    const featuredProjectsGrid =
        projectsSection.querySelector(
            ".projects"
        );


    if (
        !featuredProjectsGrid
    ) {

        return;

    }


    featuredProjectsGrid.innerHTML =
        "";


    projectOrder
        .slice(
            0,
            3
        )
        .forEach(

            function (
                projectId
            ) {

                const project =
                    projectsData[
                    projectId
                    ];


                if (
                    !project
                ) {

                    console.warn(
                        "Featured project was not found:",
                        projectId
                    );

                    return;

                }


                featuredProjectsGrid
                    .appendChild(

                        createProjectCard(
                            projectId,
                            project
                        )

                    );

            }

        );

}



/* =====================================================
INITIALIZE PROJECT GRIDS
===================================================== */

renderFeaturedProjects();

renderAllProjectsPage();



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

/*
    Event delegation is used here instead of binding each
    button individually.

    This keeps the existing home-page project buttons working
    and also supports project cards generated dynamically on
    projects.html.
*/

document.addEventListener(

    "click",

    function (
        event
    ) {

        const button =
            event.target.closest(
                ".project-link[data-project]"
            );


        if (
            !button
        ) {

            return;

        }


        event.preventDefault();


        const projectId =
            button.dataset.project;


        if (
            !projectId
        ) {

            return;

        }


        openProject(
            projectId
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