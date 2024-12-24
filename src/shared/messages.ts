function localeSymbol(val: number) {
  return val > 4 ? 'символов' : 'символа';
}

export const appMessages = {
  validation: {
    len(val: number) {
      return `${val} ${localeSymbol(val)}`;
    },
    min(val: number) {
      return `Минимум ${this.len(val)}`;
    },
    max(val: number) {
      return `Максимум ${this.len(val)}`;
    },
    required: 'Поле обязательно для заполнения',
    isNumber: 'Тут должно быть число',
  },
  auth: {
    authenticate: {
      success: 'Авторизация успешна',
      fail: 'Ошибка авторизации',
    },
    login: {
      success: 'Вход выполнен',
      fail: 'Ошибка входа',
    },
    logout: {
      success: 'Выход выполнен',
      fail: 'Ошибка выхода',
    },
  },
  crud: {
    delete: {
      success: 'Удаление успешно',
      fail: 'Ошибка удаления',
    },
    create: {
      success: 'Создание успешно',
      fail: 'Ошибка создания',
    },
    update: {
      success: 'Изменение успешно',
      fail: 'Ошибка изменения',
    },
  },

};
