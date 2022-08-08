// react
import { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Avatar,
  Typography,
  Grid,
} from '@mui/material';

// nprogress
import NProgress from 'nprogress';

// hooks
import useLocales from '../../../hooks/useLocales';
import useSettings from '../../../hooks/useSettings';

// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { RequestFallback, NoDataFallback } from '../../../components/fallback';
import UserAuthorityChip from '../../../components/UserAuthorityChip';
import UserStatusIcon from '../../../components/UserStatusIcon';

// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/administration/users/list';

// routes
import { PATH_ADMIN } from '../../../routes/paths';

// redux
import { useGetUsersQuery, useDeleteUserMutation } from '../../../app/services/jhinimal/userApi';

// config
import { TABLE_HEAD, FILTER_QUERY_KEY } from './options';
import { mapUserAuthority, mapUserStatus } from '../../../utils/dataMappers';
import { toCamelCase } from '../../../utils/formatString';

// ----------------------------------------------------------------------

export default () => {
  const { themeStretch } = useSettings();

  const { t } = useLocales();

  const defaultFilter = useMemo(
    () => ({
      [FILTER_QUERY_KEY]: '',
    }),
    []
  );

  const [selected, setSelected] = useState({
    checked: [],
    toBeDeleted: [],
  });
  const [params, setParams] = useState({
    page: 0,
    size: 5,
    sort: 'id,desc',
    ...defaultFilter,
  });

  const { data, isLoading, isFetching, error, isUninitialized } = useGetUsersQuery(params);
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const handleChangeRowsPerPage = (event) => {
    setParams((prev) => ({
      ...prev,
      page: 0,
      size: event.target.value,
    }));
  };

  const handleChangePage = (_, page) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleRequestSort = (_, property) => {
    const isAsc = params.sort.split(',')[1] === 'asc';

    setParams((prev) => ({
      ...prev,
      sort: `${property},${isAsc ? 'desc' : 'asc'}`,
    }));
  };

  const handleToggleCheckAllItemsClick = () => {
    let checked = [];

    if (!selected.checked.length) {
      checked = data.data.map((user) => user.login);
    }

    setSelected((prev) => ({
      ...prev,
      checked,
    }));
  };

  const handleCheckItemClick = (user) => {
    const selectedIndex = selected.checked.indexOf(user.login);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected.checked, user.login);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.checked.slice(1));
    } else if (selectedIndex === selected.checked.length - 1) {
      newSelected = newSelected.concat(selected.checked.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.checked.slice(0, selectedIndex),
        selected.checked.slice(selectedIndex + 1)
      );
    }

    setSelected((prev) => ({
      ...prev,
      checked: newSelected,
    }));
  };

  const handleFilterTermChange = (event) => {
    setParams((prev) => ({
      ...prev,
      [FILTER_QUERY_KEY]: event.target.value,
    }));
  };

  const handleDelete = async (user) => {
    setSelected((prev) => ({
      ...prev,
      toBeDeleted: [...prev.toBeDeleted, user.login],
    }));
  };

  const handleDeleteMultiple = () => {
    setSelected((prev) => ({
      ...prev,
      toBeDeleted: selected.checked,
    }));
  };

  const handleConfirmDeletion = async () => {
    await deleteUser(selected.toBeDeleted[0]);

    const pageShouldBeShrinked =
      params.page !== 0 && params.page * params.size + selected.toBeDeleted.length >= data.meta.totalItems;

    if (pageShouldBeShrinked) {
      setParams((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }

    setSelected((prev) => ({
      ...prev,
      checked: [],
      toBeDeleted: [],
    }));
  };

  const handleCancelDeletion = () => {
    setSelected((prev) => ({
      ...prev,
      toBeDeleted: [],
    }));
  };

  useEffect(() => {
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);

  const isFiltered = Object.keys(defaultFilter).some((key) => params[key] !== defaultFilter[key]);

  return (
    <Page title={t('labels.resourcesList', { resources: t(`labels.user_other`) }, 'toTitleCase')}>
      <RequestFallback status={data?.status || error?.status} isBusy={isUninitialized || isLoading}>
        {data && (
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading={t('labels.resourcesList', { resources: t(`labels.user_other`) }, 'toSentenceCase')}
              links={[
                { name: t('labels.administration_one'), href: PATH_ADMIN.root },
                { name: t(`labels.user_other`), href: PATH_ADMIN.user.root },
              ]}
              action={
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_ADMIN.user.create}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  {t('labels.newResource', { context: 'male', resource: t(`labels.user_one`) })}
                </Button>
              }
            />

            {data.meta.totalItems === 0 && !isFiltered ? (
              <NoDataFallback title={t('texts.dataTableIsEmpty')} description={t('texts.nothingToDisplayTryAdding')} />
            ) : (
              <Box>
                <Card>
                  <UserListToolbar
                    numSelected={selected.checked.length}
                    filterTerm={params[FILTER_QUERY_KEY]}
                    onFilterTermChange={handleFilterTermChange}
                    onDelete={handleDeleteMultiple}
                  />

                  {data.data.length ? (
                    <>
                      <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <UserListHead
                              order={params.sort.order}
                              orderBy={params.sort.by}
                              headLabel={TABLE_HEAD}
                              rowCount={data.data?.length}
                              numSelected={selected.checked.length}
                              onRequestSort={handleRequestSort}
                              onToggleSelectAllClick={handleToggleCheckAllItemsClick}
                            />
                            <TableBody>
                              {data.data.map((user) => {
                                const fullName = `${user.lastName} ${user.firstName}`;
                                const status = mapUserStatus(user.activated);
                                const isItemSelected = selected.checked.indexOf(user.login) !== -1;

                                return (
                                  <TableRow
                                    hover
                                    key={user.id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox checked={isItemSelected} onClick={() => handleCheckItemClick(user)} />
                                    </TableCell>
                                    <TableCell>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt={fullName} src={user.imageUrl} sx={{ mr: 2 }}>
                                          {fullName[0]}
                                        </Avatar>
                                        <Typography variant="subtitle2" noWrap>
                                          {fullName}
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell align="left">@{user.login}</TableCell>
                                    <TableCell align="left">
                                      <UserStatusIcon
                                        name={toCamelCase(status)}
                                        text={t(`labels.${toCamelCase(status)}`, { context: 'male' })}
                                      />
                                    </TableCell>
                                    <TableCell align="left">
                                      <Grid container spacing={1}>
                                        {user.authorities.map((authority) => {
                                          const role = mapUserAuthority(authority);

                                          return (
                                            <Grid key={authority} item>
                                              <UserAuthorityChip
                                                name={toCamelCase(role)}
                                                text={t(`labels.${toCamelCase(role)}`, { count: 1 })}
                                              />
                                            </Grid>
                                          );
                                        })}
                                      </Grid>
                                    </TableCell>
                                    <TableCell align="right">
                                      <UserMoreMenu user={user} onDelete={handleDelete} />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Scrollbar>

                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.meta.totalItems}
                        rowsPerPage={params.size}
                        page={params.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        showFirstButton
                        showLastButton
                      />
                    </>
                  ) : (
                    <Box sx={{ p: 3 }}>
                      <NoDataFallback title={t('texts.noResult')} description={t('texts.searchDidNoMatchAnyRecords')} />
                    </Box>
                  )}
                </Card>

                <Dialog
                  open={selected.toBeDeleted.length > 0}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{t('texts.areYouSureAboutThis')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {t('texts.undoneActionWarning')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button disabled={isDeletingUser} onClick={handleCancelDeletion}>
                      {t('labels.cancel')}
                    </Button>
                    <Button disabled={isDeletingUser} color="error" onClick={handleConfirmDeletion} autoFocus>
                      {t('labels.confirm')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Container>
        )}
      </RequestFallback>
    </Page>
  );
};
