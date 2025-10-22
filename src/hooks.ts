import { useSyncExternalStore } from "react";
import type { DataObserver, SetStateCallbackType } from "./stateManager";
import StateManager from "./stateManager";

/**
 * 새로운 외부 저장소를 생성합니다.
 * @template T
 * @param {T} initialState - 저장소의 초기 상태입니다.
 * @returns {DataObserver<T>} 외부 저장소를 나타내는 데이터 관찰자 객체입니다.
 */
export const store = <T>(initialState: T) => {
  const stateManager = new StateManager<T>(initialState);

  return stateManager;
};

/**
 * 데이터 관찰자에서 외부 상태를 사용하는 사용자 정의 훅입니다.
 * @template T
 * @param {DataObserver<T>} currStore - 외부 저장소를 나타내는 데이터 관찰자입니다.
 * @returns {[T, (param: SetStateCallbackType<T> | T) => void]} 현재 상태와 상태를 설정하는 함수를 포함하는 튜플입니다.
 */
export const useStore = <T>(currStore: DataObserver<T>): [T, (param: SetStateCallbackType<T> | T) => void] => {
  const { subscribe, getState, setState } = currStore;
  const state = useSyncExternalStore(subscribe, getState);

  return [state, setState];
};

/**
 * 외부 상태를 직접 설정하는 함수를 가져오는 사용자 정의 훅입니다.
 * @template T
 * @param {DataObserver<T>} currStore - 외부 저장소를 나타내는 데이터 관찰자입니다.
 * @returns {(param: SetStateCallbackType<T> | T) => void} 외부 상태를 설정하는 함수입니다.
 */
export const useSetStore = <T>(currStore: DataObserver<T>) => {
  const { setState } = currStore;

  return setState;
};

/**
 * 외부 상태의 현재 값 가져오는 사용자 정의 훅입니다.
 * @template T
 * @param {DataObserver<T>} currStore - 외부 저장소를 나타내는 데이터 관찰자입니다.
 * @returns {T} 외부 상태의 현재 값입니다.
 */
export const useGetStore = <T>(currStore: DataObserver<T>) => {
  const { subscribe, getState } = currStore;
  const state = useSyncExternalStore(subscribe, getState);

  return state;
};

/**
 * 외부 저장소의 현재 상태 스냅샷을 가져옵니다.
 * @template T
 * @param {DataObserver<T>} currStore - 외부 저장소를 나타내는 데이터 관찰자입니다.
 * @returns {T} 외부 저장소의 현재 상태 스냅샷입니다.
 */
export const getStoreSnapshot = <T>(currStore: DataObserver<T>) => {
  return currStore.getState();
};
