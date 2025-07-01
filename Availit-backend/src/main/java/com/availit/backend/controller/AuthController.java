package com.availit.backend.controller;

import com.availit.backend.model.User;
import com.availit.backend.service.UserService;
import com.availit.backend.service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import com.availit.backend.dto.RegisterRequest;
import com.availit.backend.dto.LoginRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @Operation(
        summary = "Register a new user or admin",
        description = "Registers a new user or admin account. Provide username, password, and role (USER or ADMIN).",
        requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(schema = @Schema(implementation = RegisterRequest.class))
        ),
        responses = {
            @ApiResponse(responseCode = "200", description = "User registered successfully", content = @Content(schema = @Schema(example = "{\"message\": \"User registered successfully\"}"))),
            @ApiResponse(responseCode = "400", description = "Registration failed", content = @Content(schema = @Schema(example = "{\"error\": \"Username already exists\"}")))
        }
    )
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request.getUsername(), request.getPassword(), request.getRole());
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(
        summary = "Login as user or admin",
        description = "Authenticate with username and password. Returns JWT token and user info on success.",
        requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(schema = @Schema(implementation = LoginRequest.class))
        ),
        responses = {
            @ApiResponse(responseCode = "200", description = "Login successful", content = @Content(schema = @Schema(example = "{\"token\":\"<jwt>\",\"username\":\"user\",\"role\":\"USER\"}"))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(example = "{\"error\":\"Invalid credentials\"}")))
        }
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var userOpt = userService.authenticateUser(request.getUsername(), request.getPassword());
        if (userOpt.isPresent()) {
            String token = jwtUtil.generateToken(userOpt.get());
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", userOpt.get().getUsername(),
                "role", userOpt.get().getRole()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        var users = userService.getAllUsers().stream()
            .map(user -> Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole()
            ))
            .toList();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/city/{username}")
    public ResponseEntity<?> getCity(@PathVariable String username) {
        String city = userService.getCityByUsername(username);
        if (city != null) {
            return ResponseEntity.ok(Map.of("city", city));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/city/{username}")
    public ResponseEntity<?> updateCity(@PathVariable String username, @RequestBody Map<String, String> body) {
        String city = body.get("city");
        if (city == null || city.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "City is required"));
        }
        userService.updateCityByUsername(username, city);
        return ResponseEntity.ok(Map.of("message", "City updated successfully"));
    }
} 