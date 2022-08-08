import { matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname) {
  return path ? !!matchPath({ path }, pathname) : false;
}

export function getRootActive(children, pathname) {
  return children.some((child) => !!matchPath({ path: child.path }, pathname));
}
