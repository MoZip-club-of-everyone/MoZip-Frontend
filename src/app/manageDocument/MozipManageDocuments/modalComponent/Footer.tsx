import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa6";

interface FooterProps {
  onAddMemo: (memoText: string) => void;
  onAddComment: (commentText: string) => void;
}

export default function Footer({ onAddMemo, onAddComment }: FooterProps) {
  const [memoText, setMemoText] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleMemoSubmit = () => {
    if (memoText.trim()) {
      onAddMemo(memoText);
      setMemoText("");
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <FooterWrapper>
      <MemoInputWrapper>
        <MemoInput
          placeholder="메모 남기기"
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
        />
        <SubmitIcon onClick={handleMemoSubmit}>
          <FaArrowUp />
        </SubmitIcon>
      </MemoInputWrapper>
      <CommentInputWrapper>
        <CommentInput
          placeholder="코멘트 남기기"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <SubmitIcon onClick={handleCommentSubmit}>
          <FaArrowUp />
        </SubmitIcon>
      </CommentInputWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const MemoInputWrapper = styled.div`
  position: relative;
  width: 72%;
`;

const CommentInputWrapper = styled.div`
  position: relative;
  width: 28%;
`;

const MemoInput = styled.input`
  width: 100%;
  padding: 8px;
  padding-right: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  padding-right: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #5296ff;
`;
