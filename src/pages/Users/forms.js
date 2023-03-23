import axiosInstance from "../../setup/axios";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import NavigationBar from "../../shared/components/NavigationBar";

const CreateUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await axiosInstance.post("/users/create", { name, email, document });
    setLoading(false);
    if (response.status === 201) {
      setCreated(true);
      event.target.reset();
    }
  };

  return (
    <>
      <NavigationBar />
      <main className="container">
        <h1>Criar Usuário</h1>
        {created && <p>Usuário criado com sucesso!</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="document" className="mb-3"> 
            <Form.Label>Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o documento"
              value={document}
              onChange={(event) => setDocument(event.target.value)}
              required
            />
          </Form.Group>
          <Row>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar"}
          </Button>
          </Row>
          
        </Form>
      </main>
    </>
  );
};

export default CreateUserPage;
