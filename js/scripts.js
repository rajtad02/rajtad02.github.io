document.addEventListener("DOMContentLoaded", () => {
    // Glitch effect for elements
    const elementsToGlitch = document.querySelectorAll("h1, h2, p, a");

    elementsToGlitch.forEach((element) => {
        setInterval(() => {
            element.classList.add("glitching");
            setTimeout(() => {
                element.classList.remove("glitching");
            }, Math.random() * 500 + 200); // Random glitch duration
        }, Math.random() * 5000 + 2000); // Random glitch interval
    });

    // Load content from fayyisaa.txt into the footer
    fetch('fayyisaa.txt')
        .then(response => response.text())
        .then(data => {
            const footerText = document.getElementById('footer-text');
            footerText.textContent = data;

            // Add glitch effect to the footer text
            setInterval(() => {
                footerText.classList.add("glitching");
                setTimeout(() => {
                    footerText.classList.remove("glitching");
                }, Math.random() * 500 + 200); // Random glitch duration
            }, Math.random() * 5000 + 2000); // Random glitch interval
        })
        .catch(error => console.error('Error loading text file:', error));

    // Typing effect for the header (index.html only)
    const header = document.getElementById("dynamic-header");
    if (header) {
        const textBank = ["Rajeera!", "a Computer Scientist!", "an Aspiring Cybersecurity Specialist!", "an Oromo Community Leader!"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = textBank[textIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            header.textContent = `Hello I'm ${currentText.substring(0, charIndex)}`;

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textBank.length; // Move to the next text
            }

            setTimeout(typeEffect, isDeleting ? 100 : 150); // Typing speed
        }

        typeEffect();
    }

    // Timeline functionality (index.html only)
    const timelineContainer = document.getElementById("timeline-container");
    if (timelineContainer) {
        fetch('data/JobDatabase.csv')
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.split('\n').slice(1); // Skip the header row

                // Add the timeline bar
                const timelineBar = document.createElement('div');
                timelineBar.classList.add('timeline-bar');
                timelineContainer.appendChild(timelineBar);

                rows.forEach((row) => {
                    const [job_name, location, start_date, end_date] = row.split(',');

                    if (job_name && location && start_date) {
                        const timelineItem = document.createElement('div');
                        timelineItem.classList.add('timeline-item'); // All jobs on the left side

                        const jobElement = document.createElement('span');
                        jobElement.classList.add('timeline-job', 'glitching'); // Add glitching class
                        jobElement.textContent = `${job_name} at ${location}`;

                        const detailsElement = document.createElement('div');
                        detailsElement.classList.add('timeline-details');
                        detailsElement.textContent = `Duration: ${start_date} - ${end_date || 'Present'}`;

                        timelineItem.appendChild(jobElement);
                        timelineItem.appendChild(detailsElement);
                        timelineContainer.appendChild(timelineItem);

                        // Add glitch effect to job titles
                        setInterval(() => {
                            jobElement.classList.add("glitching");
                            setTimeout(() => {
                                jobElement.classList.remove("glitching");
                            }, Math.random() * 500 + 200); // Random glitch duration
                        }, Math.random() * 5000 + 2000); // Random glitch interval
                    }
                });
            })
            .catch(error => console.error('Error loading JobDatabase.csv:', error));
    }

    // Blog search and filter functionality (blogs.html only)
    const searchBar = document.getElementById("search-bar");
    const filterBar = document.getElementById("filter-bar");
    const blogList = document.getElementById("blog-list");

    if (searchBar && filterBar && blogList) {
        fetch('data/BlogProjectDatabase.csv')
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.trim().split('\n').slice(1); // Skip the header row
                const blogs = rows.map(row => {
                    const [blog_name, project_name, blog_html, project_link, cs, oromo, hacking_tool, stats] = row.split(',');
                    return {
                        blog_name: blog_name.trim(),
                        project_name: project_name.trim(),
                        blog_html: blog_html.trim(),
                        project_link: project_link.trim(),
                        categories: {
                            cs: cs.trim() === "TRUE",
                            oromo: oromo.trim() === "TRUE",
                            hacking_tool: hacking_tool.trim() === "TRUE",
                            stats: stats.trim() === "TRUE"
                        }
                    };
                });

                // Function to display blogs
                function displayBlogs(filteredBlogs) {
                    blogList.innerHTML = filteredBlogs.map(blog => `
                        <div class="blog-item">
                            <a href="${blog.blog_html}.html">${blog.blog_name}</a> (${blog.project_name})
                        </div>
                    `).join('');
                }

                // Function to filter blogs
                function filterBlogs() {
                    const query = searchBar.value.toLowerCase();
                    const filter = filterBar.value;

                    const filteredBlogs = blogs.filter(blog => {
                        const matchesQuery = blog.blog_name.toLowerCase().includes(query);
                        const matchesFilter = filter === "all" || blog.categories[filter];
                        return matchesQuery && matchesFilter;
                    });

                    displayBlogs(filteredBlogs);
                }

                // Display all blogs initially
                displayBlogs(blogs);

                // Add event listeners for search and filter
                searchBar.addEventListener("input", filterBlogs);
                filterBar.addEventListener("change", filterBlogs);
            })
            .catch(error => console.error('Error loading BlogProjectDatabase.csv:', error));
    }
    const projectSearchBar = document.getElementById("project-search-bar");
    const projectFilterBar = document.getElementById("project-filter-bar");
    const projectList = document.getElementById("project-list");

    if (projectSearchBar && projectFilterBar && projectList) {
        fetch('data/BlogProjectDatabase.csv')
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.trim().split('\n').slice(1); // Skip the header row
                const projects = rows.map(row => {
                    const [blog_name, project_name, blog_html, project_link, cs, oromo, hacking_tool, stats] = row.split(',');
                    return {
                        project_name: project_name.trim(),
                        project_link: project_link.trim(),
                        categories: {
                            cs: cs.trim() === "TRUE",
                            oromo: oromo.trim() === "TRUE",
                            hacking_tool: hacking_tool.trim() === "TRUE",
                            stats: stats.trim() === "TRUE"
                        }
                    };
                });

                // Function to display projects
                function displayProjects(filteredProjects) {
                    projectList.innerHTML = filteredProjects.map(project => `
                        <div class="project-item">
                            <a href="${project.project_link}" target="_blank">${project.project_name}</a>
                        </div>
                    `).join('');
                }

                // Function to filter projects
                function filterProjects() {
                    const query = projectSearchBar.value.toLowerCase();
                    const filter = projectFilterBar.value;

                    const filteredProjects = projects.filter(project => {
                        const matchesQuery = project.project_name.toLowerCase().includes(query);
                        const matchesFilter = filter === "all" || project.categories[filter];
                        return matchesQuery && matchesFilter;
                    });

                    displayProjects(filteredProjects);
                }

                // Display all projects initially
                displayProjects(projects);

                // Add event listeners for search and filter
                projectSearchBar.addEventListener("input", filterProjects);
                projectFilterBar.addEventListener("change", filterProjects);
            })
            .catch(error => console.error('Error loading BlogProjectDatabase.csv:', error));
    }
});