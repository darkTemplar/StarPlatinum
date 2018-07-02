defmodule Offerdate.Mailer do
  alias Offerdate.EmailView
  use Mailgun.Client,
      domain: Application.get_env(:offerdate, :mailgun_domain),
      key: Application.get_env(:offerdate, :mailgun_key)


  def send_welcome_text_email(email_address) do
  	send_email to: email_address,
        from: Application.get_env(:offerdate, :from_email),
        subject: "Welcome to Offerdate!",
        text: "Start buying and selling listings!",
        html: Phoenix.View.render_to_string(EmailView, "welcome.html", %{})
	end
end