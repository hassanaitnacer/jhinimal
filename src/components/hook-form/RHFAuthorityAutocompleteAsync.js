// api
import { useGetAuthoritiesQuery } from '../../app/services/jhinimal/authorityApi';

// components
import RHFAutocompleteAsync from './RHFAutocompleteAsync';

// hooks
import useLocales from '../../hooks/useLocales';

// utils
import { mapUserAuthority } from '../../utils/dataMappers';
import { toCamelCase } from '../../utils/formatString';

// ----------------------------------------------------------------------

const RHFAuthorityAutocompleteAsync = (props) => {
  const { data, isLoading } = useGetAuthoritiesQuery();

  const { t } = useLocales();

  return (
    <RHFAutocompleteAsync
      loading={isLoading}
      options={data?.data || []}
      getOptionLabel={(option) => t(`labels.${toCamelCase(mapUserAuthority(option))}_one`)}
      {...props}
    />
  );
};

export default RHFAuthorityAutocompleteAsync;
