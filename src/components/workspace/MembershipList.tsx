import { FC, useMemo } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { MembershipWithId } from "@/interfaces";

type Props = {
  handleMembership: (membership: MembershipWithId) => void;
  memberships?: MembershipWithId[];
  selected?: MembershipWithId;
};

type OptionProps = {
  value: string,
  label: string
}

export const MembershipList: FC<Props> = ({ handleMembership, memberships, selected }) => {
  const handleChange = (
    newValue: OnChangeValue<OptionProps, false>,
    actionMeta: ActionMeta<OptionProps>
  ) => {
    if (!newValue) return;
    const membership:MembershipWithId | undefined = memberships?.find(m => newValue.value === m.ceramicId)
    if(!membership) return
    handleMembership(membership);
  };

  const defaultVal = useMemo(() => {
    if(!!selected) return undefined
    const selectedVal = memberships?.find(m => m.ceramicId === selected)
    return {
      value: selectedVal?.ceramicId,
      label: selectedVal?.name
    } as OptionProps
  }, [selected,memberships]);

  const memberShipOption = useMemo<OptionProps[]>(() => {
    if(!memberships) return []
    return memberships?.map(m => {
      return {
        value: m.ceramicId,
        label: m.name
      }
    })
  },[memberships])

  return (
    <div className="w-[240px]">
      <Select
        defaultValue={defaultVal}
        onChange={handleChange}
        isMulti={false}
        options={memberShipOption}
        placeholder={"Select Membership"}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#EFA9E0',
            primary: '#8E477F',
          },
        })}
        className={
          "border-none border-b-gray-400 bg-light-surface-variant dark:bg-dark-surface-variant"
        }
      />
    </div>
  );
};
