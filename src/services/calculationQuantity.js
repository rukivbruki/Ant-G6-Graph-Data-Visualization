import { greedyAlgorithm } from '../math/greedyAlgorithm';

/**
 * Вычисляет количество необходимого оборудования на объем поданной воды посредством
 * жадного алгоритма. Подготавливает данные для дальнейшего использования в цепочке
 * подготовки графа для блок схемы.
 *
 * @param computedData - данные после адаптера данных с формы
 * @param volume - объем воды
 * @returns {*[]}
 */
export const calculationQuantity = (computedData, volume) => {
  console.log('СМОТРИМ computedData', computedData);
  const computedFormData = [...computedData];

  for (let i = 0; i < computedData.length; i++) {
    const calculatedProcess = [];
    // Формируем массив со значениями объема воды по каждой из стадий
    for (const item of computedData[i]) {
      calculatedProcess.push(item[1]);
    }
    // Сохраняем количество оборудования в массиве данных оборудования
    computedFormData[i].forEach((item, i) =>
      item.push(greedyAlgorithm(calculatedProcess, volume)[i])
    );
  }

  return computedFormData;
};
