export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

export const validPhone = new RegExp(/^\d{10}$/)

export const validInt = new RegExp('^[0-9]*$')

export const validFloat = new RegExp('^(?=.)([+-]?([0-9]*)(([0-9]+))?)$')
