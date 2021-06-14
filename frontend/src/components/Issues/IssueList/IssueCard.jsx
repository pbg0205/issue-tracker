import { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "styles/theme";
import { Link } from "react-router-dom";
import { ReactComponent as UserImageSmall } from "images/UserImageSmall.svg";
import { ReactComponent as Alert } from "images/alert-circle.svg";
import { ReactComponent as Milestone } from "images/milestone.svg";
import getTimeStamp from "util/getTimeStamp";
import { useRecoilState } from "MyRecoil/useRecoilState";
import { selectedIssueCntAtomState } from "MyRecoil/atom";

const IssueCard = ({
	issue,
	setIsAnyIssueSelected,
	isAllIssueSelected,
	setIsAllIssueSelected,
	initCheck,
	setInitCheck,
}) => {
	const [isChecked, setIsChecked] = useState(false);
	const [selectedIssues, setSelectedIssues] = useRecoilState(
		selectedIssueCntAtomState
	);
	// const [initCheck, setInitCheck] = useState(true);
	const { title, id, labelId, milestoneId, author, createdAt } = issue;
	const handleCheck = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (isAllIssueSelected) {
			setIsChecked(true);
		} else if (!isAllIssueSelected) setIsChecked(false);
	}, [isAllIssueSelected]);

	useEffect(() => {
		if (isChecked) {
			setIsAnyIssueSelected(true);
			setSelectedIssues(() => selectedIssues + 1);
			setInitCheck(false);
		} else if (!initCheck && !isChecked) {
			setSelectedIssues(() => selectedIssues - 1);
		}
	}, [isChecked]);

	return (
		<StyleCard>
			<CheckBox>
				<input type="checkbox" checked={isChecked} onChange={handleCheck} />
				<div>-</div>
			</CheckBox>
			<Contents>
				<TextTagDivider>
					<span>
						<Alert /> <Link to={`/main/${id}`}>{title}</Link>
					</span>

					{/* labelId 로 라벨 정보 fetch 해와서 title, 박스 렌더링 */}
				</TextTagDivider>
				<TextTagDivider>
					<span>#{id} </span>
					<span>
						이 이슈가 {getTimeStamp(createdAt)}, {author}님에 의해
						작성되었습니다
					</span>
					<span>
						<Milestone fill={theme.grayScale.label} />
					</span>
					{/* milestoneId 로 마일스톤 정보 fetch 해와서 title만 뿌리기 */}
				</TextTagDivider>
			</Contents>
			<UserIcon>
				<UserImageSmall />
			</UserIcon>
		</StyleCard>
	);
};

export default IssueCard;

const StyleCard = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 9fr 1fr;
	background-color: ${theme.grayScale.off_white};
	border: 1px solid ${theme.grayScale.line};
	height: 100px;
`;

const CheckBox = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-direction: column;
`;

const UserIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Contents = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
`;

const TextTagDivider = styled.div`
	display: flex;
	/* justify-content: space-between; */
	/* width: 30%; */
`;
