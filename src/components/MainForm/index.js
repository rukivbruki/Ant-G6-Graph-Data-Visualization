import React, { useContext, useState } from 'react';
import { ActionCreator } from '../../reducer';
import { Context } from '../../services/сontextCreater';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'moment/locale/ru';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';

import { formDataAdapter } from '../../services/formDataAdapter';
import { calculationQuantity } from '../../services/calculationQuantity';

const FormWrapper = styled.div`
  .ant-col-4 {
    max-width: none;
    width: 200px;
  }

  .ant-form-item-required {
    width: 90px;
  }

  .ant-form-item-label {
    overflow: inherit;
  }

  flex-shrink: 0;
  width: 550px;
  padding-top: 40px;
  padding-left: 20px;
  border: 1px solid gray;
  border-right: none;
  background-color: darkgray;
`;

const { Option } = Select;

export const MainForm = (prop) => {
  const { renderFlag, setRenderFlag } = prop;
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(Context);
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const isGetTable = () => {
    renderFlag ? setRenderFlag(false) : setRenderFlag(true);
  };

  const onFinish = (values) => {
    // var march = moment('2017-03')
    values.volume &&
      dispatch(
        ActionCreator.setGraphData(
          calculationQuantity(formDataAdapter(values.process), values.volume),
          values.date.locale('ru').format('LL'),
          values.input
        )
      );
  };

  return (
    <FormWrapper>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Размер" name="size">
          <Radio.Group>
            <Radio.Button value="small">Мелкий</Radio.Button>
            <Radio.Button value="default">Обычный</Radio.Button>
            <Radio.Button value="large">Крупный</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Название" name="input">
          <Input />
        </Form.Item>
        <Form.Item label="Процессы" name="process">
          <TreeSelect
            multiple
            treeData={[
              {
                title: 'Предочистка',
                value: 'PreCleaning',
                selectable: false,
                children: [
                  {
                    title: 'Осветлитель Veolia',
                    value: 'VeoliaСlarifier',
                    selectable: false,
                    children: [
                      {
                        title: 'Установка осветления воды АКВА-УОВ-160',
                        value: 'АКВА-УОВ-160',
                      },
                      {
                        title: 'Установка осветления воды АКВА-УОВ-340',
                        value: 'АКВА-УОВ-340',
                      },
                    ],
                  },
                  {
                    title: 'Механический фильтр',
                    value: 'MechanicalFilter',
                    selectable: false,
                    children: [
                      {
                        title: 'Установка осветления воды "АКВА-ОВ-6" d1000',
                        value: 'АКВА-ОВ-6-d1000',
                      },
                      {
                        title: 'Установка осветления воды "АКВА-ОВ-14" d1500',
                        value: 'АКВА-ОВ-14-d1500',
                      },
                    ],
                  },
                ],
              },
              {
                title: 'Механическая очистка',
                value: 'MechanicalСleaning',
                selectable: false,
                children: [
                  {
                    title: 'Дисковый фильтр',
                    value: 'DiscFilter',
                    selectable: false,
                    children: [
                      {
                        title:
                          'Установка механической фильтрации воды "АКВА-МФ-20" 55 мкм',
                        value: 'АКВА-МФ-20-55-мкм',
                      },
                      {
                        title:
                          'Установка механической фильтрации воды "АКВА-МФ-150" 200 мкм',
                        value: 'АКВА-МФ-150-200-мкм',
                      },
                    ],
                  },
                  {
                    title: 'Картриджный фильтр',
                    value: 'CartridgeFilter',
                    selectable: false,
                    children: [
                      {
                        title: '1-АКВА-18-40-НС',
                        value: '1-АКВА-18-40-НС',
                      },
                      {
                        title: '6-АКВА-18-40-НС',
                        value: '6-АКВА-18-40-НС',
                      },
                    ],
                  },
                ],
              },
              {
                title: 'Баковое хозяйство',
                value: 'TankFarm',
                selectable: false,
                children: [
                  {
                    title: 'Бак',
                    value: 'Tank',
                    selectable: false,
                    children: [
                      {
                        title: 'Баки-АКВА-БАК-40',
                        value: 'Баки-АКВА-БАК-40',
                        isLeaf: true,
                      },
                      {
                        title: 'Баки-АКВА-БАК-63',
                        value: 'Баки-АКВА-БАК-63',
                        isLeaf: true,
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.List name=" ">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.process !== curValues.process ||
                      prevValues.process !== curValues.process
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Комплект"
                        name={[field.name, 'equipment']}
                        fieldKey={[field.fieldKey, 'equipment']}
                        rules={[
                          { required: true, message: 'Выберете оборудование' },
                        ]}
                        style={{ width: 250 }}
                      >
                        <Select
                          disabled={!form.getFieldValue('process')}
                          style={{ width: 160 }}
                        >
                          {(form.getFieldValue('process') || []).map((item) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Количество"
                    name={[field.name, 'volume']}
                    fieldKey={[field.fieldKey, 'volume']}
                    rules={[{ required: true, message: 'Нужно указать объем' }]}
                    style={{ width: 160 }}
                  >
                    <Input style={{ width: 40, marginLeft: 10 }} />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: 120 }}
                >
                  Add sights
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Дата схемы" name="date" format={'YYYY/MM/DD'}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Объем" name="volume">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Таблица" name="Save" onClick={isGetTable}>
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сформировать схему
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};
