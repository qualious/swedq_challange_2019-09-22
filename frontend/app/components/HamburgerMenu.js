/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Select from "react-select";
import chroma from "chroma-js";

// Taken from here:
// https://react-select.com/styles#provided-styles-and-state
const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const HamburgerMenu = ({
  companyOptions,
  companyId,
  onCompanyChanged,
  statusOptions,
  statusId,
  onStatusChanged,
  onRefreshClicked,
}) => {
  const [show, setShow] = useState(false);
  return (
    <Menu>
      <Toggle
        style={{ cursor: !show && "pointer" }}
        onClick={() => setShow(!show)}
      >
        <Line
          show={show}
          style={{
            transformOrigin: "0% 0%",
          }}
        />
        <Line
          show={show}
          style={{
            opacity: show ? 0 : 1,
            transform: show ? "rotate(0deg) scale(0.2, 0.2)" : "",
          }}
        />
        <Line
          show={show}
          style={{
            marginTop: show ? 7 : 0,
            transformOrigin: "0% 100%",
            transform: show ? "rotate(-45deg) translate(0, -1px)" : "",
          }}
        />
      </Toggle>
      <ComponentList show={show}>
        <Refresh onClick={onRefreshClicked}>↻</Refresh>
        <Component>
          <Select
            isClearable
            isSearchable
            className="react-select company"
            classNamePrefix="react-select"
            name="singleSelect"
            placeholder="Filter by company"
            value={companyOptions.find(company => company.id === companyId)}
            onChange={onCompanyChanged}
            options={companyOptions}
            styles={colourStyles}
          />
        </Component>
        <Component>
          <Select
            isClearable
            isSearchable
            className="react-select status"
            classNamePrefix="react-select"
            name="singleSelect"
            placeholder="Filter by status"
            value={statusOptions.find(status => status.value === statusId)}
            onChange={onStatusChanged}
            options={statusOptions}
            styles={colourStyles}
          />
        </Component>
      </ComponentList>
    </Menu>
  );
};

HamburgerMenu.propTypes = {
  companyOptions: PropTypes.array,
  companyId: PropTypes.string,
  onCompanyChanged: PropTypes.func,
  statusOptions: PropTypes.array,
  statusId: PropTypes.number,
  onStatusChanged: PropTypes.func,
  onRefreshClicked: PropTypes.func,
};

const Menu = styled.div`
  height: 0px;
`;

const Toggle = styled.div`
  display: block;
  position: relative;
  top: 50px;
  left: 50px;

  width: 35px;

  z-index: 2;

  -webkit-user-select: none;
  user-select: none;
`;

const Line = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 6px;
  position: relative;
  background: ${p => (p.show ? "#151516" : "#cdcdcd")};
  border-radius: 3px;
  cursor: pointer;
  z-index: 1;
  transform: ${p => (p.show ? "rotate(45deg) translate(-2px, -1px)" : "")};
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
`;

const Refresh = styled.div`
  position: absolute;
  cursor: pointer;
  right: 51px;
  top: 67px;
  font-size: 30px;
  color: #151516;
`;

const ComponentList = styled.ul`
  position: relative;
  display: block;
  top: 50px;
  left: 50px;

  z-index: 1;

  -webkit-user-select: none;
  user-select: none;

  min-width: 500px;
  width: 30%;
  min-height: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;

  background: rgba(255, 255, 255, 0.3);
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: ${p => (p.show ? "none" : "translate(-100%, 0)")};

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`;

const Component = styled.li`
  cursor: pointer;
  padding: 10px 0;
  font-size: 22px;
`;

export default memo(HamburgerMenu);
