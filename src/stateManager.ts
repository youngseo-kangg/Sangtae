/**
 * 이 함수는 이전 상태를 새로운 상태로 매핑하는 콜백 함수를 나타냅니다.
 * @template T
 * @param {T} prevState - 이전 상태입니다.
 * @returns {T} 새로운 상태입니다.
 */
export type SetStateCallbackType<T> = (prevState: T) => T;

/**
 * 데이터 관찰자를 나타내는 인터페이스입니다.
 * @template T
 * @interface
 */
export interface DataObserver<T> {
  /**
   * 상태를 설정하는 메서드입니다.
   * @param {SetStateCallbackType<T> | T} param - 설정할 상태 또는 상태를 갱신하는 함수입니다.
   * @returns {void}
   */
  setState: (param: SetStateCallbackType<T> | T) => void;

  /**
   * 현재 관리하고 있는 전역 상태를 반환하는 메서드입니다.
   * @returns {T} 현재 상태입니다.
   */
  getState: () => T;

  /**
   * 리스너를 등록하고 해제하는 메서드입니다.
   * @param {() => void} listener - 등록할 리스너 함수입니다.
   * @returns {() => void} 리스너를 해제하는 함수입니다.
   */
  subscribe: (listener: () => void) => () => void;

  /**
   * 상태 변경을 알리는 메서드입니다.
   * 상태가 변경되면, 상태를 구독하고 있는 컴포넌트들이 리렌더링 됩니다.
   * @returns {void}
   */
  emitChange: () => void;
}

/**
 * 상태를 관리하는 클래스입니다.
 * @template T
 * @implements {DataObserver<T>}
 */
class StateManager<T> implements DataObserver<T> {
  /** 현재 상태를 나타냅니다. */
  public state: T;

  /** 등록된 모든 리스너를 포함하는 배열입니다. */
  private listeners: Array<() => void> = [];

  /**
   * StateManager 클래스의 생성자입니다.
   * @param {T} initialState - 초기 상태입니다.
   */
  constructor(initialState: T) {
    this.state = initialState;
  }

  /**
   * 상태를 설정합니다.
   * @param {SetStateCallbackType<T> | T} param - 설정할 상태 또는 상태를 갱신하는 함수입니다.
   * @returns {void}
   */
  setState = (param: SetStateCallbackType<T> | T) => {
    if (param instanceof Function) {
      const newState = param(this.state);
      this.state = newState;
    } else {
      this.state = param;
    }

    this.emitChange();
  };

  /**
   * 현재 상태를 반환합니다.
   * @returns {T} 현재 상태입니다.
   */
  getState = () => {
    return this.state;
  };

  /**
   * 리스너를 등록하고 해제합니다.
   * @param {() => void} listener - 등록할 리스너 함수입니다.
   * @returns {() => void} 리스너를 해제하는 함수입니다.
   */
  subscribe = (listener: () => void) => {
    this.listeners = [...this.listeners, listener];

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  /**
   * 등록된 모든 리스너에게 상태 변경을 알립니다.
   * @returns {void}
   */
  emitChange = (): void => {
    // eslint: no-restricted-syntax 에러 수정
    Array.from(this.listeners).forEach((listener) => {
      listener();
    });
    // for (const listener of this.listeners) {
    //   listener();
    // }
  };
}

export default StateManager;
