import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";



const Table = styled.table`
    width: 100vw;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1450px;
    margin: 20px 0;
    word-break: break-all; // Caso o dispositivo seja muito pequeno ele quebra as palavras
`;


export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;


export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;

export const TdPlay = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};
    cursor: pointer;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;

export const TdCheck = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};
    cursor: pointer;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;

export const TdEdit = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};
    cursor: pointer;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;

export const TdTrash = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};
    cursor: pointer;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;


const StatusButton = styled.button`
  position: relative;
  padding: 5px 17px;
  border: none;
  border-radius: 5px;

  &::before {
    content: "";
    padding: 1px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }

  ${(props) =>
    props.status === "Pendente" &&
    `
    &::before {
      background-color: gray;
    }
  `}

  ${(props) =>
    props.status === "Em andamento" &&
    `
    &::before {
      background-color: yellow;
    }
  `}

  ${(props) =>
    props.status === "Concluída" &&
    `
    &::before {
      background-color: green;
    }
  `}
`;



const Grid = ({ tarefas, setTarefas, setOnEdit  }) => {

    const handleDelete = async (id) => {
        await axios
            .delete('http://localhost:8800/' + id)
            .then(({ data }) => {
                const newArray = tarefas.filter((tarefa) => tarefa.id !== id);

                setTarefas(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        setOnEdit(null);
    };

    const handleConcluir = async (id) => {
        try {
          await axios.put(`http://localhost:8800/concluir/${id}`);
          const updatedTarefas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, status: "Concluída" } : tarefa
          );
          setTarefas(updatedTarefas);
          toast.success("Tarefa concluída com sucesso!");
        } catch (error) {
          toast.error("Erro ao concluir a tarefa.");
        }
    };

    const handleIniciar = async (id) => {
        try {
          await axios.put(`http://localhost:8800/iniciar/${id}`);
          const updatedTarefas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, status: "Em andamento" } : tarefa
          );
          setTarefas(updatedTarefas);
          toast.success("Tarefa iniciada com sucesso!");
        } catch (error) {
          toast.error("Erro ao iniciar a tarefa.");
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th>Título</Th>
                    <Th>Descrição</Th>
                    <Th>Status</Th>
                    <Th>Tempo Estimado</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {tarefas.map((item, i) => (
                    <Tr key={i}>
                        <TdPlay alignCenter width="5%">
                            <FaRegCirclePlay  onClick={() => handleIniciar(item.id)} />
                        </TdPlay>
                        <Td width='20%'>{item.titulo}</Td>
                        <Td width='20%'>{item.descricao}</Td>
                        <Td width="20%">
                            <StatusButton status={item.status}>{item.status}</StatusButton>
                        </Td>
                        <Td width='20%'>{item.tempo_estimado}</Td>
                        <TdCheck alignCenter width="5%">
                            <FaRegCheckSquare onClick={() => handleConcluir(item.id)} />
                        </TdCheck>
                        <TdEdit alignCenter width="5%">
                          <FiEdit onClick={() => setOnEdit(item)} />
                        </TdEdit>
                        <TdTrash alignCenter width="5%">
                            <FaTrashAlt onClick={() => handleDelete(item.id)} />
                        </TdTrash>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
