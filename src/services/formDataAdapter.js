import { equipmentData } from '../Data/equipmentData/index';

/**
 * Трансформирует данные с формы в формат необходимый для работы алгоритма
 * расчета количества необходимого оборудования
 *
 * @param formData
 * @returns {[]}
 */

export const formDataAdapter = (formData) => {
  let transformedFormData = [];
  let result = [];
  // Макаем необходимые параметры из структуры данных оборудования (equipmentData)
  // в новую структуру
  for (const item of formData) {
    transformedFormData.push([
      item,
      equipmentData.get(item).volume,
      equipmentData.get(item).stage,
    ]);
  }
  // Находим названия текущих стадий очистки
  let stages = transformedFormData.reduce(
    (sum, current) => (!sum.includes(current[2]) ? [...sum, current[2]] : sum),
    []
  );

  // Сортируем элементы оборудования в порядке убывания пропускной способности
  transformedFormData.sort(function (a, b) {
    return b[1] - a[1];
  });
  // Создаем структуру данных в виде массива массивов массивов, где первый уровень
  // вложенности это стадии, а второй уровень это это массивы с данными оборудования
  for (let stageName of stages) {
    let arr = transformedFormData.reduce(
      (sum, current) => (current[2] === stageName ? [...sum, current] : sum),
      []
    );
    result.push(arr);
  }

  return result;
};
