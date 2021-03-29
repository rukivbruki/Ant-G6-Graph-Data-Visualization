let flag = true;

export const colorizeSwitchElem = () => {
  const antSwitchElem = document.querySelector('.ant-switch');
  const toggle = () => flag = !flag;
  
  antSwitchElem.addEventListener('click', () => {
	toggle();
	return flag ? antSwitchElem.style = 'background: ""' : antSwitchElem.style = 'background: #6e6e6e';
  })
};
