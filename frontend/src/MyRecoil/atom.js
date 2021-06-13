function atom({ key, initialState }) {
	return { key, initialState };
}

export const issueAtomState = atom({
	key: "issueAtomState",
	initialState: true,
});

export const milestoneAtomState = atom({
	key: "milestoneAtomState",
	initialState: [],
});

export const asigneeAtomState = atom({
	key: "asigneeAtomState",
	initialState: [],
});

export const labelAtomState = atom({
	key: "labelAtomState",
	initialState: [],
});

export const authorAtomState = atom({
	key: "authorAtomState",
	initialState: [],
});
