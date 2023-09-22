import classes from "./Header.module.css"

const Header = (props: any) => {
  console.log("header", props)
  return <nav className={classes.headerNav}>{props.children}</nav>
}

export default Header
