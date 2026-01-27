async function uploadToCloudinary(file) {
    const cloudName = "dfi2e1lwd";
    const uploadPreset = "gazela_uploads";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Cloudinary Error:", errorData);
            throw new Error("Erreur lors de l'envoi du fichier.");
        }

        const data = await response.json();
        return data.secure_url;
    } catch (err) {
        console.error("Upload failed:", err);
        throw err;
    }
}

function initContactForms() {
    // Vérifie que Toastify est chargé
    if (typeof Toastify === 'undefined') {
        console.error('Toastify is not loaded!');
        return;
    }

    const forms = document.querySelectorAll("form");
    if (!forms.length) return;

    const successMsg = "🎉 Votre message a bien été envoyé ! Je vous répondrai bientôt.";
    const errorMsg = `⚠️ Oups ! L'envoi du message a échoué. Veuillez réessayer ou m'envoyer un email directement <a href="mailto:mickaelrakotonarivo@gmail.com" style="color: #020828; text-decoration: underline; font-weight: bold;">ici</a>`;

    const emailConfig = {
        userId: "eqWIHcTZUiGnh6cH5",
        templateId: "template_hsm0nru",
        serviceId: "service_2f6kux5"
    };

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            var originalText = "Envoyer";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.5";
                submitBtn.style.cursor = "not-allowed";
                originalText = submitBtn.innerText;
                submitBtn.innerText = "⏳ Envoi en cours...";
            }
            // Get form data
            const formData = new FormData(form);

            // Build message from all form fields
            let messageContent = "";
            for (let [key, value] of formData.entries()) {
                if (value instanceof File && value.size > 0) {
                    try {
                        const fileUrl = await uploadToCloudinary(value);
                        messageContent += `${key}: ${fileUrl}\n`;
                    } catch (err) {
                        console.error("Upload failed", err);
                        messageContent += `${key}: (Échec de l'envoi du fichier)\n`;
                    }
                } else if (value && !(value instanceof File)) {
                    messageContent += `${key}: ${value}\n`;
                }
            }

            const templateParams = {
                to_name: "Gazela",
                to_email: "mickaelrakotonarivo@gmail.com",
                from_name: formData.get("name") || "Anonyme",
                from_email: formData.get("contact") || "Non fourni",
                message: messageContent.trim() || "Aucun contenu"
            };

            try {
                await emailjs.send(
                    emailConfig.serviceId,
                    emailConfig.templateId,
                    templateParams,
                    emailConfig.userId
                );

                Toastify({
                    text: successMsg,
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    className: "toast-success",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                        color: "#ffffff",
                        zIndex: 9999,
                        marginBottom: "50px",
                        boxShadow: "0 4px 24px 0 rgba(46, 204, 113, 0.4)",
                        borderRadius: "8px",
                        fontWeight: "500"
                    }
                }).showToast();

                form.reset();
            } catch (error) {
                console.error("Failed to send email:", error);

                Toastify({
                    text: errorMsg,
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    className: "toast-error",
                    stopOnFocus: true,
                    escapeMarkup: false,
                    style: {
                        background: "#ffffff",
                        color: "#d35400",
                        zIndex: 9999,
                        marginBottom: "50px",
                        boxShadow: "0 4px 24px 0 rgba(211, 84, 0, 0.2)",
                        borderRadius: "8px",
                        border: "2px solid #e67e22"
                    }
                }).showToast();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.cursor = "pointer";
                    submitBtn.innerText = originalText;
                }
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForms);
} else {
    initContactForms();
}