import axiosInstance from "../../setup/axios";
import { useEffect, useState } from "react";
import { Button, Form, Alert, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavigationBar from "../../shared/components/NavigationBar";


const CreateCompensation = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState();

    const [impactId, setImpactId] = useState();
    const [impacts, setImpacts] = useState([]);

    const [email, setEmail] = useState();
    const [amount, setAmount] = useState();
    const [goalPhrase, setGoalPhrase] = useState();
    const [referralCode, setReferralCode] = useState();


    async function getImpacts() {
        const response = await axiosInstance.get("/impacts");
        const data = response.data;
        setImpacts(data);
        setGoalPhrase(data.goalPhrase);
    }

    useEffect(() => {
        getImpacts();

    }, []);

    async function saveCompensation() {
        setLoading(true);
        const impact = impacts.find((i) => i.id === impactId);
        const requestBody = {
            email,
            amount: parseFloat(amount),
            impactId,
            goalPhrase: impact.goalPhrase,
            referralCode
        };
        try {
            await axiosInstance.post("/compensations/create", requestBody);
            setAlert({
                success: true,
                message: "Salvo com sucesso",
            });
        } catch (e) {
            setAlert({
                success: false,
                message: "Erro de validação dos dados, confirme as entradas",
            });
        }
        setLoading(false);

    }
    return (
        <>
            <NavigationBar />
            <main className="container">
                {!!alert ? (
                    <Alert
                        variant={alert.success ? "success" : "danger"}
                        className="my-3"
                        dismissible
                        onClose={() => setAlert()}
                    >
                        {alert.message}
                    </Alert>
                ) : null}
                <div className="d-flex justify-content-between my-3">
                    <h1> {"Criar Compensação"}</h1>
                </div>
                {loading ? (
                    <div className="spinner-border text-primary mx-auto" role="status" />
                ) : (
                    <Form>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Impacto</Form.Label>
                            <Form.Select
                                onChange={(event) => {
                                    setImpactId(event.target.value);
                                }}
                                defaultValue=""
                                value={impactId}
                                disabled={!!params.id ? true : false}
                            >
                                <option value="" disabled hidden>
                                    Selecione o impacto
                                </option>
                                {impacts.length === 0 ? (
                                    <option>Carregando</option>
                                ) : (
                                    impacts.map((e, key) => (
                                        <option value={`${e.id}`} key={key}>
                                            {e.name}
                                        </option>
                                    ))
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="amount" className="mb-3">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Quantidade"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Group controlId="referralCode" className="mb-3">
                                <Form.Label>Código de indicação</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Código"
                                  value={referralCode}
                                  onChange={(event) => setReferralCode(event.target.value)}
                                  required  
                                />
                            </Form.Group>
                        </Form.Group>

                        <Row>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    saveCompensation();
                                }}
                            >
                                Salvar
                            </Button>
                        </Row>
                    </Form>
                )}
            </main>
        </>
    );
};
export default CreateCompensation;