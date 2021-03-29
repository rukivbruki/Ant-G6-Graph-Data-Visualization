export const stageNumberComparator = (
  transformedFormData,
  firstStage,
  secondStage
) => {
  const numberEquipment = (stage) => {
    let count = 0;
    transformedFormData[stage]?.forEach((item) => (count += item[3]));
    return count;
  };
  return numberEquipment(firstStage) < numberEquipment(secondStage);
};
