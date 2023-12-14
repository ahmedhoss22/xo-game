"use client";
import React, { useState } from "react";
import "./settings.scss";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AdminPanel({ children }) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className="settings">
      <div className="wrapper d-flex align-items-stretch">
        <nav
          id="sidebar"
          className={`order-last ${isSidebarActive ? "active" : ""}`}
        >
          <div className="custom-menu">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
              onClick={toggleSidebar}
            >
              {isSidebarActive ? (
                <FaArrowLeft className="fs-5 fw-bold mb-4 " />
              ) : (
                <FaArrowRight className="fs-5 fw-bold mb-4 " />
              )}
            </button>
          </div>
          <div className="sidebar mt-4">
            <h1 className="">
              <a className="logo primary-sidebar">XO DASHBOARD</a>
            </h1>
    

            <ul className="list-unstyled components mb-5">
              <li>
                <Link prefetch href="support">
                  <span className="fa fa-sticky-note mr-3" /> الدعم
                </Link>
              </li>
              <li className="active">
                <Link prefetch href="store">
                  <span className="fa fa-home mr-3" /> المتجر
                </Link>
              </li>{" "}
              <li className="active">
                <Link prefetch href="users">
                  <span className="fa fa-home mr-3" /> المستخدمين
                </Link>
              </li>
              <li>
                <Link prefetch href="gifts">
                  <span className="fa fa-user mr-3" /> هدايا المتجر
                </Link>
              </li>
              <li>
                <Link prefetch href="users">
                  <span className="fa fa-user mr-3" /> المستخدمين
                </Link>
              </li>
              <li>
                <Link prefetch href="privacysettings">
                  <span className="fa fa-user mr-3" /> سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link prefetch href="userspoints">
                  <span className="fa fa-user mr-3" /> نقاط دخول المستوايات
                </Link>
              </li>
              <li>
                <Link prefetch href="/">
                  <span className="fa fa-user mr-3" /> الذهاب الي وجهة المستخدم
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
          id="content"
          className={`sidebar p-4 p-md-5 pt-5 ${
            isSidebarActive ? "active" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
