const parseForm = (form) => {
  const inputs = form.childNodes;
  let result = {};
  inputs.forEach((child) => {
    switch (child.nodeName) {
      case 'INPUT':
        switch (child.type) {
          case 'text':
          case 'tel':
          case 'email':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            result = {
              ...result,
              [child.name]: child.value,
            };
            break;
          case 'radio':
          case 'checkbox':
            if (child.checked) {
              result = {
                ...result,
                [child.name]: child.value,
              };
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
  return result;
};
export default parseForm;
