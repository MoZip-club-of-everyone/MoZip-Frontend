import React, { useState } from "react";
import styled from "styled-components";
import Header from "./modal/Header";
import Content from "./modal/Content";
import Footer from "./modal/Footer";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Memo {
  title: string;
  content: string;
}

interface Comment {
  name: string;
  date: string;
  content: string;
}

export default function CommentModal({ isOpen, onClose }: CommentModalProps) {
  if (!isOpen) return null;

  const [memos, setMemos] = useState<Memo[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const addMemo = (memoText: string) => {
    const newMemo: Memo = {
      title: `지원자: 김강민 / 1번 문항 / ${new Date().toLocaleDateString()}`,
      content: memoText,
    };
    setMemos([...memos, newMemo]);
  };

  const addComment = (commentText: string) => {
    const newComment: Comment = {
      name: "이수혁",
      date: new Date().toLocaleDateString(),
      content: commentText,
    };
    setComments([...comments, newComment]);
  };

  return (
    <ModalWapper>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Header />
        <hr />
        <Content memos={memos} comments={comments} />
        <hr />
        <Footer onAddMemo={addMemo} onAddComment={addComment} />
      </ModalContainer>
    </ModalWapper>
  );
}
const ModalWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 55rem;
  height: 40rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
