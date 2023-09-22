import classes from "./Header.module.css"

const Header = (props: any) => {
  return <nav className={classes.headerNav}>{props.children}</nav>
}

export default Header
