"use strict";
exports.__esModule = true;
var react_1 = require("react");
var tailwind_react_ui_1 = require("tailwind-react-ui");
require("./Research.css");
var axios_1 = require("../../utils/axios");
var react_router_dom_1 = require("react-router-dom");
var ResearchCard_1 = require("./ResearchCard");
var Research = function () {
    var _a = react_1.useState(false), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(""), searchDept = _b[0], setSearchDept = _b[1];
    var _c = react_1.useState(""), searchName = _c[0], setSearchName = _c[1];
    var _d = react_1.useState(""), headName = _d[0], setHeadName = _d[1];
    var _e = react_1.useState(""), aor = _e[0], setAor = _e[1];
    var _f = react_1.useState([]), departments = _f[0], setDepartments = _f[1];
    var _g = react_1.useState([{ name: "", description: "" }]), researches = _g[0], setResearches = _g[1];
    var getResearches = function () {
        var url = "/projects";
        axios_1.axiosInstance
            .get(url)
            .then(function (res) {
            console.log(res.data.data);
            setResearches(res.data.data);
        })["catch"](function (err) { return console.log(err); });
    };
    var getDepartments = function () {
        var url = "/department";
        axios_1.axiosInstance
            .get(url)
            .then(function (res) {
            setDepartments(res.data.data);
        })["catch"](function (err) { return console.log(err); });
        url = "/admin_user/search/?professor=" + localStorage.getItem('email');
    };
    var getUserPrivilege = function () {
        var url = "/user/is_staff/";
        axios_1.axiosInstance
            .get(url)
            .then(function (res) {
            setUser(res.data.data);
        })["catch"](function (err) { return console.log(err); });
        url = "/admin_user/search/?professor=" + localStorage.getItem('email');
    };
    react_1.useEffect(function () {
        getUserPrivilege();
        getResearches();
        getDepartments();
    }, []);
    var showResearches = function () {
        return researches.map(function (item, key) {
            return (react_1["default"].createElement(ResearchCard_1["default"], { data: item, key: key }));
        });
    };
    var handleDepartmentChange = function (e) {
        setSearchDept(e.target.value);
    };
    var handleHeadNameChange = function (e) {
        setHeadName(e.target.value);
        handleQuery();
    };
    var handleQuery = function () {
        var url = "/project/search?department=" + searchDept + "&projectName=" + searchName + "&headName=" + headName + "&aor=" + aor;
        axios_1.axiosInstance
            .get(url)
            .then(function (res) {
            setResearches(res.data.data);
        })["catch"](function (err) { return console.log(err); });
    };
    var handleSearchByProjectName = function (e) {
        setSearchName(e.target.value);
        handleQuery();
    };
    var handleSearchByAor = function (e) {
        setAor(e.target.value);
        handleQuery();
    };
    return (react_1["default"].createElement("div", { className: "wrapper" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-6 justify-items-center md:justify-items-start" },
                user ? (react_1["default"].createElement(react_router_dom_1.Link, { to: "/create-project", className: "m-3" },
                    react_1["default"].createElement(tailwind_react_ui_1.Button, { className: "w-full bg-red-800 text-white" }, "Create Project"))) : null,
                react_1["default"].createElement("div", { className: "searchHolder relative flex mb-3 mt-3 w-full" },
                    react_1["default"].createElement("input", { type: "text", className: "searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800", placeholder: "Search by project Name", onChange: handleSearchByProjectName }),
                    react_1["default"].createElement("div", { className: "absolute top-3 right-8" },
                        " ",
                        react_1["default"].createElement("i", { className: "fa fa-search text-gray-400 z-20 hover:text-gray-500" }),
                        " ")),
                react_1["default"].createElement("div", { className: "searchHolder relative flex mb-3 mt-3 w-full" },
                    react_1["default"].createElement("input", { type: "text", className: "searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800", placeholder: "Search by AOR", onChange: handleSearchByAor }),
                    react_1["default"].createElement("div", { className: "absolute top-3 right-8" },
                        " ",
                        react_1["default"].createElement("i", { className: "fa fa-search text-gray-400 z-20 hover:text-gray-500" }),
                        " ")),
                react_1["default"].createElement("div", { className: "searchHolder relative flex mb-3 mt-3 w-full" },
                    react_1["default"].createElement("input", { type: "text", className: "searchInput h-10 border-2 border-black pr-8 pl-5 rounded z-0 focus:shadow focus:border-red-800", placeholder: "Search by Professor", onChange: handleHeadNameChange }),
                    react_1["default"].createElement("div", { className: "absolute top-3 right-8" },
                        " ",
                        react_1["default"].createElement("i", { className: "fa fa-search text-gray-400 z-20 hover:text-gray-500" }),
                        " ")))),
        react_1["default"].createElement("div", { className: "main-container mb-10" },
            react_1["default"].createElement(tailwind_react_ui_1.Aside, null,
                react_1["default"].createElement(tailwind_react_ui_1.Label, { className: "filterLabel" }, "Filter By department"),
                react_1["default"].createElement(tailwind_react_ui_1.Field, null,
                    react_1["default"].createElement(tailwind_react_ui_1.Select, { className: "border-2 border-black focus:shadow focus:border-red-800", name: "select", onChange: handleDepartmentChange, options: departments.map(function (item, key) {
                            return {
                                value: item.short_name,
                                label: item.full_name
                            };
                        }) })),
                react_1["default"].createElement(tailwind_react_ui_1.Button, { className: "w-40 bg-red-800 text-white", onClick: function () {
                        handleQuery();
                    } }, "Apply")),
            react_1["default"].createElement("div", { className: "results container-1 m-3 flex flex-auto justify-center" },
                react_1["default"].createElement("div", { className: "flex flex-wrap m-10" }, researches.length ? showResearches() : null)))));
};
exports["default"] = Research;
