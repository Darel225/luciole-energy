<?php
// =========================================================================
// CONFIGURATION OFFICIELLE - DESTINATAIRE DES DEMANDES (LIVRAISON CLIENT)
// =========================================================================
// Modifiez simplement cette adresse e-mail le jour de la livraison pour que
// le client reçoive directement toutes les demandes de devis et de contact.
$emailDestinataireClient = "darelseke608@gmail.com"; // Remplacer par l'email du client (ex: info@luciole-energy.com)

// =========================================================================
// TRAITEMENT DU FORMULAIRE DE CONTACT & DEVIS B2B - LUCIOLE ENERGY
// Passerelle sécurisée avec Gabarit HTML Corporate Haute Définition
// =========================================================================

// 1. En-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
    exit;
}

// 2. Récupération des données
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Honeypot anti-spam
if (!empty($data["website"])) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Demande traitée avec succès."]);
    exit;
}

// 3. Assainissement des données
$nom         = strip_tags(trim($data["name"] ?? $data["nom"] ?? ''));
$entreprise  = strip_tags(trim($data["company"] ?? $data["entreprise"] ?? ''));
$email       = filter_var(trim($data["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone   = strip_tags(trim($data["phone"] ?? $data["telephone"] ?? ''));
$service     = strip_tags(trim($data["service"] ?? 'Non spécifié'));
$localite    = strip_tags(trim($data["location"] ?? $data["site_localite"] ?? ''));
$details     = strip_tags(trim($data["details"] ?? $data["message"] ?? ''));
$fileName    = strip_tags(trim($data["fileName"] ?? $data["file_name"] ?? ''));
$fileSize    = strip_tags(trim($data["fileSize"] ?? $data["file_size_formatted"] ?? ''));

// Décodage des entités HTML pour des textes nets
$nom         = html_entity_decode($nom, ENT_QUOTES, 'UTF-8');
$entreprise  = html_entity_decode($entreprise, ENT_QUOTES, 'UTF-8');
$service     = html_entity_decode($service, ENT_QUOTES, 'UTF-8');
$localite    = html_entity_decode($localite, ENT_QUOTES, 'UTF-8');
$details     = html_entity_decode($details, ENT_QUOTES, 'UTF-8');

// 4. Validations
if (empty($nom)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre nom complet."]);
    exit;
}

if (empty($entreprise)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre entreprise."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Format d'adresse e-mail invalide."]);
    exit;
}

if (empty($telephone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre numéro de téléphone."]);
    exit;
}

$dateEnvoi = date("d/m/Y à H:i");
$sujet = "⚡ [Nouveau Devis B2B] " . $service . " — " . $entreprise . " (" . $nom . ")";

// 5. Conception du Gabarit HTML Premium Luciole Energy
$safeNom        = htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
$safeEntreprise = htmlspecialchars($entreprise, ENT_QUOTES, 'UTF-8');
$safeEmail      = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeTelephone  = htmlspecialchars($telephone, ENT_QUOTES, 'UTF-8');
$safeService    = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$safeLocalite   = !empty($localite) ? htmlspecialchars($localite, ENT_QUOTES, 'UTF-8') : 'Non précisée';
$safeDetails    = !empty($details) ? nl2br(htmlspecialchars($details, ENT_QUOTES, 'UTF-8')) : '<em style="color:#94a3b8;">Aucun détail technique supplémentaire renseigné.</em>';

$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande de Devis Luciole Energy</title>
</head>
<body style="margin: 0; padding: 30px 15px; background-color: #F1F5F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <!-- Conteneur Principal -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
        
        <!-- En-tête Marque Luciole Energy -->
        <tr>
            <td style="background: linear-gradient(135deg, #0A331D 0%, #0E4829 100%); padding: 35px 35px 30px 35px; text-align: left; position: relative;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <!-- Badge B2B officiel -->
                            <div style="display: inline-block; padding: 5px 12px; background-color: rgba(61, 220, 132, 0.15); border: 1px solid rgba(61, 220, 132, 0.4); border-radius: 30px; margin-bottom: 12px;">
                                <span style="display: inline-block; width: 6px; height: 6px; background-color: #3DDC84; border-radius: 50%; vertical-align: middle; margin-right: 6px;"></span>
                                <span style="color: #3DDC84; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">ÉTUDE TECHNIQUE & DEVIS B2B</span>
                            </div>
                            <h1 style="color: #FFFFFF; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">
                                Luciole Energy<span style="color: #3DDC84;">.</span>
                            </h1>
                            <p style="color: #B4DFC4; font-size: 13px; margin: 0; line-height: 1.5;">
                                Nouvelle notification de lead reçue le <strong>{$dateEnvoi}</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Corps de l'email -->
        <tr>
            <td style="padding: 32px 35px;">

                <!-- PÔLE CONCERNÉ (Mise en avant) -->
                <div style="background-color: #F8FAF9; border-left: 4px solid #0E4829; border-radius: 0 12px 12px 0; padding: 16px 20px; margin-bottom: 28px;">
                    <div style="font-size: 11px; font-weight: 800; color: #0E4829; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">PÔLE TECHNIQUE SOLLICITÉ</div>
                    <div style="font-size: 17px; font-weight: 700; color: #0F172A;">{$safeService}</div>
                </div>

                <!-- SECTION 1 : INTERLOCUTEUR & SOCIÉTÉ -->
                <div style="margin-bottom: 26px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                        <tr>
                            <td>
                                <span style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.8px;">1. Interlocuteur & Société</span>
                            </td>
                        </tr>
                    </table>

                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0;">
                        <tr>
                            <td width="35%" style="padding: 12px 16px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 700; color: #64748B;">Société / Raison Sociale</td>
                            <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 700; color: #0F172A;">{$safeEntreprise}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 700; color: #64748B;">Nom du Contact</td>
                            <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; font-weight: 600; color: #0F172A;">{$safeNom}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12px; font-weight: 700; color: #64748B;">Email Professionnel</td>
                            <td style="padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #0E4829; font-weight: 600;">
                                <a href="mailto:{$safeEmail}" style="color: #0E4829; text-decoration: none;">{$safeEmail} &rarr;</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 16px; background-color: #F8FAFC; font-size: 12px; font-weight: 700; color: #64748B;">Téléphone Direct</td>
                            <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #0F172A;">
                                <a href="tel:{$safeTelephone}" style="color: #0F172A; text-decoration: none;">{$safeTelephone}</a>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- SECTION 2 : SITE D'INTERVENTION & LOCALITÉ -->
                <div style="margin-bottom: 26px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                        <tr>
                            <td>
                                <span style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.8px;">2. Localisation & Chantier</span>
                            </td>
                        </tr>
                    </table>

                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0;">
                        <tr>
                            <td width="35%" style="padding: 12px 16px; background-color: #F8FAFC; font-size: 12px; font-weight: 700; color: #64748B;">Site d'intervention</td>
                            <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0F172A;">{$safeLocalite}</td>
                        </tr>
                    </table>
                </div>

                <!-- SECTION 3 : DÉTAILS TECHNIQUES DU BESOIN -->
                <div style="margin-bottom: 28px;">
                    <div style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">
                        3. Spécifications & Expression du Besoin
                    </div>
                    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px 20px; font-size: 13px; line-height: 1.6; color: #1E293B;">
                        {$safeDetails}
                    </div>
                </div>

HTML;

if (!empty($fileName)) {
    $safeFileName = htmlspecialchars($fileName, ENT_QUOTES, 'UTF-8');
    $safeFileSize = !empty($fileSize) ? " (" . htmlspecialchars($fileSize, ENT_QUOTES, 'UTF-8') . ")" : "";
    $htmlBody .= <<<HTML
                <!-- SECTION 4 : CAHIER DES CHARGES JOINT -->
                <div style="margin-bottom: 28px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 16px 20px;">
                    <div style="font-size: 11px; font-weight: 800; color: #065F46; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;">📎 DOCUMENT TECHNIQUE EN PIÈCE JOINTE</div>
                    <div style="font-size: 13px; font-weight: 700; color: #047857;">{$safeFileName}{$safeFileSize}</div>
                </div>
HTML;
}

$htmlBody .= <<<HTML
                <!-- BOUTONS D'ACTION RAPIDE (RÉPONDRE DIRECTEMENT) -->
                <div style="text-align: center; padding-top: 10px; border-top: 1px solid #E2E8F0; margin-top: 30px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-right: 8px;">
                                <a href="mailto:{$safeEmail}?subject=Re:%20Votre%20demande%20de%20devis%20Luciole%20Energy" style="display: inline-block; background-color: #0E4829; color: #FFFFFF; font-size: 13px; font-weight: 700; padding: 12px 22px; border-radius: 10px; text-decoration: none;">
                                    ✉️ Répondre par email
                                </a>
                            </td>
                            <td style="padding-left: 8px;">
                                <a href="tel:{$safeTelephone}" style="display: inline-block; background-color: #F1F5F9; color: #0F172A; font-size: 13px; font-weight: 700; padding: 12px 22px; border-radius: 10px; text-decoration: none; border: 1px solid #CBD5E1;">
                                    📞 Appeler le contact
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>

            </td>
        </tr>

        <!-- Pied de page -->
        <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 35px; text-align: center;">
                <p style="color: #64748B; font-size: 11px; margin: 0 0 4px 0; line-height: 1.5;">
                    Ce message a été généré automatiquement par la plateforme officielle <strong>Luciole Energy CI</strong>.
                </p>
                <p style="color: #94A3B8; font-size: 10px; margin: 0;">
                    Zone Industrielle de Yopougon, Batim 3 Rue S153 • Abidjan, Côte d'Ivoire
                </p>
            </td>
        </tr>

    </table>

</body>
</html>
HTML;

// 6. Expédition ultra-propre via PHPMailer (HTML)
$sent = false;
$vendorAutoload = __DIR__ . '/../vendor/autoload.php';

if (file_exists($vendorAutoload)) {
    require_once $vendorAutoload;
    
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'darelseke608@gmail.com';
            $mail->Password   = 'qzfnyjnnckgahskm';
            $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
            $mail->CharSet    = 'UTF-8';

            $mail->setFrom('darelseke608@gmail.com', 'Luciole Energy • Devis');
            $mail->addAddress($emailDestinataireClient);
            $mail->addReplyTo($email, $nom);

            $mail->isHTML(true);
            $mail->Subject = $sujet;
            $mail->Body    = $htmlBody;
            
            // Version texte alternative de secours
            $mail->AltBody = "NOUVELLE DEMANDE DE DEVIS - LUCIOLE ENERGY\n" .
                             "Société: {$entreprise}\n" .
                             "Contact: {$nom}\n" .
                             "Email: {$email}\n" .
                             "Téléphone: {$telephone}\n" .
                             "Pôle: {$service}\n" .
                             "Localité: {$localite}\n" .
                             "Détails: {$details}\n";

            if (isset($_FILES['document']) && $_FILES['document']['error'] === UPLOAD_ERR_OK) {
                $mail->addAttachment($_FILES['document']['tmp_name'], $_FILES['document']['name']);
            }

            $mail->send();
            $sent = true;
        } catch (\Exception $e) {
            error_log("PHPMailer HTML Error: " . $e->getMessage());
            $sent = false;
        }
    }
}

// Repli mail() avec en-têtes HTML si PHPMailer indisponible
if (!$sent) {
    $destinataire = $emailDestinataireClient;
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Luciole Energy <contact@flstructures.alwaysdata.net>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $sent = @mail($destinataire, $sujet, $htmlBody, $headers);
}

// 7. Réponse JSON au client
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Votre demande a été envoyée avec succès. Un ingénieur d'affaires vous recontactera sous 24 à 48h ouvrées."
]);
?>
