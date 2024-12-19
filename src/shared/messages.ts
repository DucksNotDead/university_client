export const Messages = {
  validation: {
    min(val: number) {
      return `Минимум ${val} символов`
    },
    max(val: number) {
      return `Максимум ${val} символов`
    },
    required: 'Поле обязательно для заполнения'
  }
}