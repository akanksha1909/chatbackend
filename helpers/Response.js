
class Response {
    errorInternal(res, err) {
        console.error('Error occured on ' + new Date());
        console.error(err);
        return res.status(500).json({ message: "oops! error occured. Please try again later", error: err })
    }
    success(res, data, message) {
        if (!message)
            message = "Operation Successful"

        return res.json({ message, data });
    }
    sessionExpired(res) {
        return res.status(401).json({ message: "You've been logged in from some other device. Please login again" });
    }
    dataExists(res, message) {
        if (!message)
            message = 'Record already exists';
        return res.status(403).json({ message })
    }
    notFound(res, message) {
        if (!message)
            message = 'Not Found';

        return res.status(404).json({ message })
    }
    notAuthorized(res, message) {
        return res.status(403).json({ message });
    }
    message(res, status, message) {
        return res.status(status).json({ message });
    }
    badValues(res, message) {
        let errorMessage = 'Bad Values';
        if (message != undefined) {
            errorMessage = message;
        }
        return res.status(400).json({ message: errorMessage })
    }
}

Response = new Response();
module.exports = Response;