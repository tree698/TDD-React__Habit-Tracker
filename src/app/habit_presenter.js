/** HabitPresenter:
 * UI에서 보여지는 비즈니스 로직을 담고 있음*/

export default class HabitPresenter {
  constructor(habits, maxHabit) {
    this.habits = habits;
    this.maxHabit = maxHabit;
  }

  getHabits() {
    return this.habits;
  }

  increment(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    update(this.habits);
  }

  decrement(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    update(this.habits);
  }

  delete(habit, update) {
    this.habits = this.habits.filter((item) => item.id !== habit.id);
    update(this.habits);
  }

  add(name, update) {
    // 로직을 추가할 수 있다
    if (this.habits.length === this.maxHabit) {
      throw new Error(`습관의 개수는 ${this.maxHabit}개 이상이 될수 없습니다`);
    }
    this.habits = [...this.habits, { id: Date.now(), name, count: 0 }];
    update(this.habits);
  }

  reset(update) {
    this.habits = this.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
      //   return { ...habit, count: 0 };  // object를 새로 만든다
    });
    update(this.habits);
  }
}
