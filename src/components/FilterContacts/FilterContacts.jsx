import { InputFilter } from './FilterContacts.styled';

const FilterContacts = ({ textTitel, filterData, onChange }) => {
  return (
    <>
      <h2>{textTitel}</h2>
      <InputFilter
        type="text"
        name="filter"
        value={filterData}
        onChange={onChange}
      />
    </>
  );
};

export default FilterContacts;
