"use client";
import React, { useEffect, useState } from "react";
import "./settings.scss";
import Link from "next/link";
import localFont from "next/font/local";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const myFont = localFont({ src: "../../assets/fonts/Pacifico-Regular.ttf" });
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";

export default function AdminPanel({ children }) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const user = useSelector((state) => state.user.data);

  if (loading) {
    return <></>;
  }

  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    redirect("/home");
  }

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
            <h3 className=" text-center mt-10" style={myFont.style}>
              <a className="logo primary-sidebar">XO DASHBOARD</a>
            </h3>

            <ul className="list-unstyled components mb-5">
              <li>
                <Link prefetch href="support" as={'/settings/support'}>
                  <span className="fa fa-sticky-note mr-3" /> الدعم
                </Link>
              </li>
              <li className="active">
                <Link prefetch href="store"  as={'/settings/store'}>
                  <span className="fa fa-home mr-3" /> المتجر
                </Link>
              </li>{" "}
              <li>
                <Link prefetch href="changecoins"  as={'/settings/changecoins'}>
                  <span className="fa fa-user mr-3" /> هدايا المتجر
                </Link>
              </li>
              <li>
                <Link prefetch href="users"  as={'/settings/users'}>
                  <span className="fa fa-user mr-3" /> المستخدمين
                </Link>
              </li>{" "}
              <li>
                <Link prefetch href="playingpoints"  as={'/settings/playingpoints'}>
                  <span className="fa fa-user mr-3" /> نقاط اللعب
                </Link>
              </li>
              <li>
                <Link prefetch href="privacysettings"  as={'/settings/privacysettings'}>
                  <span className="fa fa-user mr-3" /> سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link prefetch href="userspoints"  as={'/settings/userspoints'}>
                  <span className="fa fa-user mr-3" /> نقاط دخول المستوايات
                </Link>
              </li>
              <li>
                <Link prefetch href="/home">
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
