CREATE DATABASE faculdade;
USE faculdade;

CREATE TABLE IF NOT EXISTS usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT, -- ID do usuário no banco de dados
	nome VARCHAR(255) NOT NULL, -- Nome do usuário
    email VARCHAR(255) NOT NULL, -- Email do usuario
    login VARCHAR(50) NOT NULL UNIQUE, -- Login do usuário
    senha VARCHAR(255) NOT NULL -- Senha do usuário
);

CREATE TABLE IF NOT EXISTS registros(
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID do registro 
    id_usuario INT NOT NULL, -- ID usuário responsavel pela acão
    descricao VARCHAR(255) NOT NULL, -- Descrição da movimentação
    data_registro DATE NOT NULL, -- Data do registro
    hora_registro TIME NOT NULL, -- Hora do registro
    tipo VARCHAR(1) NOT NULL, -- Tipo da operação: I (inserção), A (alteração), D (deleção)
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS logs(
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID do log de auditoria
    tp_reg VARCHAR(1) NOT NULL,                 -- Tipo da operação: I (inserção), A (alteração), D (deleção)
    id_usuario INT NOT NULL,            -- id do usuário do banco que realizou a ação
    dt_acao DATE NOT NULL,                      -- Data em que a ação foi realizada
    hr_acao TIME NOT NULL,                      -- Hora da ação
    id_registro INT NULL,                   -- ID do registro da tabela principal que foi afetado
    ds_reg VARCHAR(255) NOT NULL           -- recebe a descrição do registro
);

DELIMITER $$ 

CREATE PROCEDURE IF NOT EXISTS create_user(
    IN p_nome VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_login VARCHAR(50),
    IN p_senha VARCHAR(255)
)
BEGIN
    DECLARE accounts_count INT;

    -- Verifica no banco se já existe algum usuário com o mesmo login
    SELECT COUNT(*) INTO accounts_count FROM usuarios WHERE login = p_login OR email = p_email;

    IF accounts_count > 0 THEN
        -- Caso já exista uma conta ele ira retornar um erro
        SELECT "ERROR" AS status, "Login/Email já cadastrado em nosso sistema" as message;
    ELSE
        -- Caso não exista, ele ira adicionar o usuário ao banco de dados
        INSERT INTO usuarios(nome, email, login, senha) VALUES(p_nome, p_email, p_login, p_senha);

        -- E por ultimo retornar o id do usuário e o status de sucesso
        SELECT "SUCCESS" AS status, LAST_INSERT_ID() AS insertID;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE changeName(
    IN p_id INT, 
    IN p_nome VARCHAR(255)
)
BEGIN
    UPDATE usuarios
    SET nome = p_nome
    WHERE id = p_id;

    SELECT 'SUCCESS' AS status;

END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE changePass(
    IN p_id INT, 
    IN p_senha VARCHAR(255)
)
BEGIN
    UPDATE usuarios
    SET senha = p_senha
    WHERE id = p_id;

    SELECT 'SUCCESS' AS status;

END$$

DELIMITER ;

DELIMITER $$

DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS add_reg(
    IN p_id_usuario INT,
    IN p_descricao VARCHAR(255),
    IN p_tipo VARCHAR(1) -- Tipo da operação: I (inserção), A (alteração), D (deleção)
)
BEGIN
    INSERT INTO registros
    (
        id_usuario,
        descricao,
        data_registro,
        hora_registro,
        tipo
    ) 
    VALUES
    (
        p_id_usuario,
        p_descricao,
        CURDATE(),
        CURTIME(),
        p_tipo
    );

    SELECT LAST_INSERT_ID() AS insertID;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE add_log(
    IN p_id_usuario INT,
    IN p_descricao VARCHAR(255),
    IN p_tipo VARCHAR(1) -- Tipo da operação: I (inserção), A (alteração), D (deleção)

)
BEGIN
    INSERT INTO logs(
        tp_reg,
        id_usuario,
        dt_acao,
        hr_acao,
        ds_reg
    ) VALUES (
        p_tipo,
        p_id_usuario,
        CURDATE(),
        CURTIME(),
        p_descricao
    );

    SELECT 'SUCCESS' AS status, 'Log adicionado no sistema' AS message;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE del_user(
    IN p_id INT
)
BEGIN
    DECLARE registros_count INT;

    SELECT COUNT(*) INTO registros_count FROM registros WHERE id_usuario = p_id;

    IF registros_count > 0 THEN
        SELECT 'ERROR' AS status, 'Você precisa apagar os registros do usuário para realizar está ação' AS message;
    ELSE        
        DELETE FROM usuarios WHERE id = p_id;

        SELECT 'SUCCESS' AS status, 'Usuário Deletado Com Sucesso' AS message;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE del_userReg (
    IN p_id INT
)
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_nome VARCHAR(255);

    -- Buscar id_usuario antes de deletar
    SELECT id, nome INTO v_id_usuario, v_nome
    FROM usuarios
    WHERE id = p_id;

    -- Deletar o registro
    DELETE FROM registros WHERE id_usuario = p_id;

    -- Chamar a outra procedure para registrar o log
    CALL add_log(
        p_id,
        CONCAT(
            'Todos os registros do usuário ',
            v_nome,
            '[',
            v_id_usuario,
            ']',
            ' Foram apagados'
        ),
        'D'
    );

    -- Informar que os registros foram apagados
    SELECT 'SUCCESS' AS status, 'Todos os registros foram apagados' AS message;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER log_update
AFTER INSERT ON registros
FOR EACH ROW
BEGIN
    INSERT INTO logs(
        tp_reg,
        id_usuario,
        dt_acao,
        hr_acao,
        id_registro,
        ds_reg
    )

    VALUES(
        new.tipo,
        new.id_usuario,
        new.data_registro,
        new.hora_registro,
        new.id,
        new.descricao
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER userCreated
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO registros
    (
        id_usuario,
        descricao,
        data_registro,
        hora_registro,
        tipo
    ) 
    VALUES
    (
        new.id,
        CONCAT(
            'Novo Usuário Cadastrado: ',
            new.nome,
            '[',
            new.id,
            ']'
        ),
        CURDATE(),
        CURTIME(),
        'I'
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER nameChanged
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN

    IF old.nome <> new.nome THEN
        INSERT INTO registros
        (
            id_usuario,
            descricao,
            data_registro,
            hora_registro,
            tipo
        ) 
        VALUES
        (
            new.id,
            CONCAT(
                'Nome do usuário foi alterado de ',
                old.nome,
                ' para ',
                new.nome
            ),
            CURDATE(),
            CURTIME(),
            'A'
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER passChanged
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN

    IF old.senha <> new.senha THEN
        INSERT INTO registros
        (
            id_usuario,
            descricao,
            data_registro,
            hora_registro,
            tipo
        ) 
        VALUES
        (
            new.id,
            'Senha do usuário foi alterada',
            CURDATE(),
            CURTIME(),
            'A'
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER userDeleted
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN

    CALL add_log(
        old.id,
        CONCAT(
            'Usuário deletado: ',
            old.nome,
            '[',
            old.id,
            ']'
        ),
        'D'
    );

END$$

DELIMITER ;