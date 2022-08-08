// components
import RHFAutocompleteAsync from './RHFAutocompleteAsync';

// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RHFLangKeyAutocompleteAsync = (props) => {
  const { t, allLang } = useLocales();

  return (
    <RHFAutocompleteAsync
      options={allLang.map((lang) => lang.value)}
      getOptionLabel={(option) => t(`labels.${option}LangKey`)}
      {...props}
    />
  );
};

export default RHFLangKeyAutocompleteAsync;
