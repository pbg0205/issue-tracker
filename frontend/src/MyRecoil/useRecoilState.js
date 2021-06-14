import { useContext, useState, useCallback, useEffect } from "react";
import { globalStateRoot } from "App";

export const useRecoilState = atom => {
	const { key } = atom;
	const store = useContext(globalStateRoot).current;
	const [, setReRender] = useState({});
	store.setInitState(atom);

	const forceUpdate = useCallback(() => {
		setReRender({});
	}, []);

	useEffect(() => {
		store.subscribe({ key, fn: forceUpdate });
	}, []);

	return [store.getState(key), store.setState(key)];
};
