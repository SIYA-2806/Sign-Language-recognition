import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();


  return (
    <Nav>
      <ul className="navbar-list">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/learn">Learn</NavLink>
        </li>
        <li>
          <NavLink to="/community">Community</NavLink>
        </li>
        <li>
          <NavLink to="/practice">Practice</NavLink>
        </li>
        {!isLoggedIn ? (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        ) : (
          <li>
            <NavLink onClick={logout}>Logout</NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  /*margin: auto 0;
    position: fixed;
        right: 0px;
    */
  .navbar-list {
    display: flex;
    padding: 0.5em;
    border-radius: 500px 500px 500px 500px;
    background-color: ${({ theme }) => theme.colors.div_bg};
    li {
      background-color: ${({ theme }) => theme.colors.div_bg};
      border-radius: 500px 500px 500px 500px;

      list-style: none;
      overflow: hidden;
      text-align: center;
      a {
        padding: 1em;
        font-size: 2rem;
        text-decoration: none;

        color: ${({ theme }) => theme.colors.white};

        transition: color 0.3s ease-in;
        /* Add a transition effect */
      }
      &:hover {
        transition-delay: 0.4;

        a {
          color: black;
        }
        background-color: #ebb032;
      }
    }
  }
`;

export default Navbar;
