import React, { useState, useEffect } from "react";
import { request } from "../../utils.js";
import { CustomTable } from "../../components/CustomTable/index.js";
import { Pagination } from "../../components/Pagination/index.js";
import { useRouter } from "../../hooks/useRouter.js";
import './styles.css';

const Home = () => {
    const [projectList, setProjectList] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const { location, searchParams, navigate } = useRouter();

    // For Pagination
    const pageNumber = Number(searchParams.get("pageNumber") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "5");

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projectList.length === 0) return;
        filterProjects();
    }, [projectList.length, location.search]);

    const fetchProjects = async () => {
        const baseUrl = `https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json`;
        const options = { method: "GET" };
        try {
            const projects = await request(baseUrl, options);
            setProjectList(projects);
        } catch (error) {
            console.log(error);
        }
    };

    const filterProjects = () => {
        if (!Number.isInteger(pageSize) || pageSize <= 0) {
            console.error("Invalid pageSize. It must be a positive integer.");
            return;
        }
        if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
            console.error("Invalid pageNumber. It must be a positive integer.");
            return;
        }
        const startIdx = (pageNumber - 1) * pageSize;
        const endIdx = startIdx + Number(pageSize);
        const updatedFilteredProjects = projectList.slice(startIdx, endIdx);
        setFilteredProjects(updatedFilteredProjects);
    };

    const tableConfig = [
        { heading: "S.No.", dataKey: "s.no", type: "" },
        {
            heading: "Percentage funded",
            dataKey: "percentage.funded",
            type: "percentage",
        },
        { heading: "Amount pledged", dataKey: "amt.pledged", type: "currency" },
    ];

    const afterPaginationApply = (query) => {
        const finalUrl = `${location.pathname}?${query}`;
        navigate(finalUrl);
    };

    return (
        <div className="homeContainer">
            <div className="tableWrapper">
                <CustomTable data={filteredProjects} config={tableConfig} />
            </div>
            <Pagination
                totalItems={projectList.length}
                filteredItems={filteredProjects.length}
                afterPaginationApply={afterPaginationApply}
            />
        </div>
    );
};

export { Home };
