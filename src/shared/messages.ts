export const appMessages = {
  validation: {
    min(val: number) {
      return `Минимум ${val} символов`;
    },
    max(val: number) {
      return `Максимум ${val} символов`;
    },
    required: 'Поле обязательно для заполнения',
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
