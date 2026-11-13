
CREATE DATABASE IF NOT EXISTS painel_vendas;

USE painel_vendas;


CREATE TABLE IF NOT EXISTS pedidos (
    codigo INT PRIMARY KEY,
    regiao VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    produto VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    frete DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO pedidos
(codigo, regiao, estado, produto, data, quantidade, preco, frete, total)
VALUES
(1001,'Região Centro-Oeste','GO','Smartphone iOS','2024-11-17',4,8300,15,33260),
(1002,'Região Sudeste','SP','Pen drive 32GB','2024-11-17',4,45,10,220),
(1003,'Região Sul','RS','Smartphone iOS','2024-11-17',2,8300,15,16630),
(1004,'Região Sul','RS','Monitor OLED 33"','2024-11-18',1,1790,15,1805),
(1005,'Região Sudeste','SP','SmartTV TV 50" 4K','2024-11-18',1,2950,10,2960),
(1006,'Região Nordeste','BA','Smartphone Android','2024-11-18',4,3200,20,12880),
(1007,'Região Sudeste','SP','SmartTV TV 50" 4K','2024-11-18',2,2950,10,5920),
(1008,'Região Sudeste','RJ','TV 48" 4K','2024-11-19',4,2840,10,11400),
(1009,'Região Nordeste','BA','SmartTV TV 50" 4K','2024-11-19',5,2950,20,14850),
(1010,'Região Sudeste','RJ','Smartphone Android','2024-11-19',1,3200,10,3210),
(1011,'Região Sudeste','RJ','TV 60" 4K','2024-11-19',1,3470,10,3480),
(1012,'Região Centro-Oeste','GO','Monitor OLED 33"','2024-11-19',3,1790,15,5415),
(1013,'Região Sudeste','MG','TV 60" 4K','2024-11-20',5,3470,10,17400),
(1014,'Região Norte','AM','Smartphone Android','2024-11-20',4,3200,25,12900),
(1015,'Região Sudeste','MG','Pen drive 32GB','2024-11-20',5,45,10,275),
(1016,'Região Sudeste','ES','Monitor OLED 33"','2024-11-20',4,1790,10,7200),
(1017,'Região Sudeste','ES','Pen drive 32GB','2024-11-20',1,45,10,55),
(1018,'Região Sul','PR','Smartphone iOS','2024-11-20',2,8300,15,16630),
(1019,'Região Sul','PR','Monitor OLED 33"','2024-11-20',5,1790,15,9025),
(1020,'Região Sul','PR','Smartphone iOS','2024-11-20',1,8300,15,8315),
(1021,'Região Sudeste','SP','Monitor OLED 33"','2024-11-21',5,1790,10,9000),
(1022,'Região Sudeste','SP','Smartphone Android','2024-11-21',1,3200,10,3210),
(1023,'Região Sul','RS','TV 60" 4K','2024-11-21',2,3470,15,6970),
(1024,'Região Sudeste','SP','Monitor OLED 33"','2024-11-21',5,1790,10,9000),
(1025,'Região Sudeste','RJ','Monitor OLED 33"','2024-11-21',5,1790,10,9000),
(1026,'Região Sudeste','RJ','TV 60" 4K','2024-11-21',3,3470,10,10440),
(1027,'Região Sudeste','MG','Monitor OLED 33"','2024-11-21',3,1790,10,5400),
(1028,'Região Sudeste','MG','Smartphone iOS','2024-11-21',1,8300,10,8310),
(1029,'Região Nordeste','BA','Pen drive 32GB','2024-11-21',3,45,20,195),
(1030,'Região Sul','SP','Pen drive 32GB','2026-11-13',66,45,15,3960),
(1031,'Região Sul','RJ','TV 48" 4K','2026-11-19',10,2840,15,28550);



SELECT * FROM pedidos ORDER BY codigo;


SELECT
    COUNT(*) AS total_pedidos,
    SUM(quantidade) AS total_unidades,
    SUM(total) AS faturamento,
    AVG(total) AS ticket_medio
FROM pedidos;

