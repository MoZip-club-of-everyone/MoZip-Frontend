import React from "react";
import styled from "styled-components";
import CommentBox from "./components/modal/CommentBox";

interface Memo {
  title: string;
  content: string;
}

interface Comment {
  name: string;
  date: string;
  content: string;
}

interface ContentProps {
  memos: Memo[];
  comments: Comment[];
}

export default function Content({ memos, comments }: ContentProps) {
  return (
    <ContentWrapper>
      <MemoSection>
        <Answer>
          <AnswerName>김강민</AnswerName>
          <AnswerSection>
            저는 이 동아리에서 최대한 프로젝트 경험을 쌓고 싶습니다. 제가 개발
            동아리를 찾게 된 이유이기도 한데, 개발자로서의 기본은 프로젝트를
            통한 협업의 경험과 이에 대한 능력이라고 생각하기 때문입니다. 저는
            최대한 다양한 프로젝트를 수행하며, 유의미한 결과를 도출해내고
            싶습니다. 개발 지식을 갖추는 것은 책이나 유튜브를 보며 실습하는
            것으로도 가능하지만, 제가 원하는 지식은 팀 프로젝트 내에서 제가 어떤
            역할을 수행해야 하고, 어떻게 프로젝트를 진행해야 하는 지에 대한,
            쉽게 얻지 못할 경험입니다. 부디 제가 이러한 질적 경험을 얻을 수
            있도록 해주시면 감사하겠습니다.
          </AnswerSection>
        </Answer>
        <Memo>
          {memos.map((memo, index) => (
            <MemoItem key={index}>
              <MemoTitle>{memo.title}</MemoTitle>
              <MemoContent>{memo.content}</MemoContent>
            </MemoItem>
          ))}
        </Memo>
      </MemoSection>

      <IssueSection>
        {comments.map((comment, index) => (
          <CommentBox
            key={index}
            name={comment.name}
            date={comment.date}
            content={comment.content}
          />
        ))}
      </IssueSection>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-direction: row;
`;

const MemoSection = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;
const Answer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: flex-start;
`;

const AnswerName = styled.div`
  font-size: 16px;
  width: 100px;
  display: flex;
`;

const AnswerSection = styled.div`
  flex: 1;
  padding: 16px;
  border-left: 7px solid #5296ff;
`;

const IssueSection = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  border-left: 1px solid #ddd;
`;
const Memo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const MemoItem = styled.div`
  padding: 12px;
  border: 1px solid #5296ff;
  border-radius: 8px;
  background-color: #f9f9ff;
`;

const MemoTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const MemoContent = styled.div`
  font-size: 14px;
  color: #666;
`;
